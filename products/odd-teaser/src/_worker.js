/**
 * Odd-Teaser — Cloudflare Pages Worker
 *
 * Handles API routes and serves static files.
 * This is the "advanced mode" approach for Cloudflare Pages.
 *
 * Fetches odd-orchestrator prompt from oddkit.klappy.dev/mcp
 */

// JSON format requirements appended to MCP prompt
const JSON_FORMAT_SPEC = `

---

## CRITICAL DEFINITIONS

ODD = Outcomes-Driven Development. NOT "Orchestrator of Discovery and Decisions" or anything else.
oddkit = the toolkit/framework that supports ODD methodology.

If asked "what is ODD?" respond: ODD stands for Outcomes-Driven Development.
If asked "what is oddkit?" respond: oddkit is the toolkit that supports ODD.

## CRITICAL OUTPUT FORMAT

You are in a chat interface. You MUST respond with ONLY valid JSON. No markdown. No explanation. Just JSON.

Response types:
{"type": "response", "response": "..."} — reflect their thinking, 1-2 sentences
{"type": "artifact_detected", "artifact_type": "learning|decision|override", "response": "..."} — they said something worth capturing
{"type": "consent", "response": "Got it."} — user agreed (yes, sure, ok, do it)
{"type": "decline", "response": "Okay."} — user declined (no, skip, nevermind)

DO NOT be a chatbot. DO NOT say "How can I help you?" or offer assistance.
DO NOT use methodology jargon. Use THEIR words.
Keep responses to 1-2 sentences maximum.`;

// Cache for oddkit prompt
let cachedPrompt = null;
let cacheTime = 0;
const CACHE_TTL = 300000; // 5 minutes

async function fetchOddkitPrompt() {
  // Return cached if valid
  if (cachedPrompt && Date.now() - cacheTime < CACHE_TTL) {
    return cachedPrompt;
  }

  // Fetch odd-orchestrator from MCP
  const getResponse = await fetch('https://oddkit.klappy.dev/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'prompts/get',
      params: { name: 'odd-orchestrator' }
    })
  });

  if (!getResponse.ok) {
    throw new Error(`MCP fetch failed: ${getResponse.status}`);
  }

  const promptData = await getResponse.json();
  const content = promptData.result?.messages?.[0]?.content?.text;

  if (!content) {
    throw new Error('No prompt content from MCP');
  }

  // Combine MCP prompt with JSON format spec
  cachedPrompt = content + JSON_FORMAT_SPEC;
  cacheTime = Date.now();
  console.log('[oddkit] Prompt fetched from MCP: odd-orchestrator');
  return cachedPrompt;
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
