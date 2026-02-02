/**
 * Odd-Teaser — Cloudflare Pages Worker
 *
 * Handles API routes and serves static files.
 * This is the "advanced mode" approach for Cloudflare Pages.
 *
 * Fetches system prompt from oddkit.klappy.dev/mcp
 */

// Fallback prompt based on behavior.md contract
const FALLBACK_PROMPT = `You are the ODD Teaser — a thinking companion for ODD (Observation-Driven Development).

ODD is a methodology for capturing learnings, decisions, and overrides as you work. oddkit is the toolkit. You help users externalize their thinking.

CRITICAL: You MUST respond with valid JSON only. No plain text. Every response must be one of these JSON formats:

{"type": "response", "response": "your message here"}
{"type": "artifact_detected", "artifact_type": "learning", "response": "That sounds like a learning. Want to capture it?"}
{"type": "artifact_detected", "artifact_type": "decision", "response": "That sounds like a decision. Want to capture it?"}
{"type": "artifact_detected", "artifact_type": "override", "response": "That sounds like a correction. Want to capture it?"}
{"type": "consent", "response": "Got it."}
{"type": "decline", "response": "Okay, continuing."}

When user says something like "I realized...", "turns out...", "the issue was..." → artifact_detected with type learning
When user says "I decided...", "going with...", "the tradeoff is..." → artifact_detected with type decision
When user says "actually...", "scratch that...", "I was wrong..." → artifact_detected with type override
When user responds to a capture question with yes/sure/do it → consent
When user responds with no/skip/nevermind → decline
Otherwise → response

Keep responses to 1-3 sentences. Use their words.`;

// Cache for oddkit prompt
let cachedPrompt = null;
let cacheTime = 0;
const CACHE_TTL = 300000; // 5 minutes

async function fetchOddkitPrompt() {
  // Return cached if valid
  if (cachedPrompt && Date.now() - cacheTime < CACHE_TTL) {
    return cachedPrompt;
  }

  try {
    // MCP JSON-RPC request to list prompts
    const listResponse = await fetch('https://oddkit.klappy.dev/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'prompts/list'
      })
    });

    if (!listResponse.ok) {
      console.log('[oddkit] List prompts failed:', listResponse.status);
      return FALLBACK_PROMPT;
    }

    const listData = await listResponse.json();
    console.log('[oddkit] Available prompts:', JSON.stringify(listData));

    // Look for odd-teaser or thinking-companion prompt (NOT scribe - that's a full agent)
    const prompts = listData.result?.prompts || [];
    const targetPrompt = prompts.find(p =>
      p.name === 'odd-teaser' ||
      p.name === 'thinking-companion' ||
      p.name?.includes('odd-teaser') ||
      p.name?.includes('thinking-companion')
    );

    if (!targetPrompt) {
      console.log('[oddkit] No matching prompt found, using fallback');
      return FALLBACK_PROMPT;
    }

    // Fetch the specific prompt
    const getResponse = await fetch('https://oddkit.klappy.dev/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 2,
        method: 'prompts/get',
        params: { name: targetPrompt.name }
      })
    });

    if (!getResponse.ok) {
      console.log('[oddkit] Get prompt failed:', getResponse.status);
      return FALLBACK_PROMPT;
    }

    const promptData = await getResponse.json();
    const content = promptData.result?.messages?.[0]?.content?.text ||
                    promptData.result?.description ||
                    FALLBACK_PROMPT;

    cachedPrompt = content;
    cacheTime = Date.now();
    console.log('[oddkit] Prompt fetched successfully');
    return content;

  } catch (err) {
    console.log('[oddkit] Fetch error:', err.message);
    return FALLBACK_PROMPT;
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function handleChat(request, env) {
  // DEBUG
  const debug = {
    hasEnv: !!env,
    hasOpenAIKey: !!env?.OPENAI_API_KEY,
    keyPrefix: env?.OPENAI_API_KEY?.substring(0, 7) || 'MISSING',
  };
  console.log('[DEBUG] Chat request:', JSON.stringify(debug));

  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({
      error: 'API key not configured',
      debug
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const body = await request.json();
  const { messages } = body;

  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'Invalid request: messages array required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // Fetch system prompt from oddkit (with fallback)
  const systemPrompt = await fetchOddkitPrompt();

  const openaiMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: openaiMessages,
      max_tokens: 1024,
      temperature: 0.7,
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[DEBUG] OpenAI error:', response.status, errorText);
    return new Response(JSON.stringify({
      error: 'OpenAI API error',
      status: response.status,
      details: errorText
    }), {
      status: response.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const data = await response.json();
  const assistantMessage = data.choices?.[0]?.message?.content || '';

  let parsedResponse;
  try {
    parsedResponse = JSON.parse(assistantMessage);
  } catch {
    parsedResponse = {
      type: 'response',
      response: assistantMessage
    };
  }

  return new Response(JSON.stringify(parsedResponse), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // API routes
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      try {
        return await handleChat(request, env);
      } catch (error) {
        console.error('[DEBUG] Handler error:', error);
        return new Response(JSON.stringify({
          error: 'Internal error',
          message: error.message
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Serve static files via ASSETS binding
    return env.ASSETS.fetch(request);
  }
};
