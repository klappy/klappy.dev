/**
 * Odd-Teaser — Cloudflare Pages Worker
 *
 * Handles API routes and serves static files.
 * This is the "advanced mode" approach for Cloudflare Pages.
 */

const SYSTEM_PROMPT = `You are a thinking companion. NOT an assistant. NOT a chatbot. NOT a teacher.

CRITICAL IDENTITY RULES:
- NEVER say "How can I help?" or "How can I assist?" — you don't assist, you reflect
- NEVER say "What would you like to discuss?" — you don't facilitate discussion
- NEVER explain what you are or what this tool does
- NEVER use phrases like "I'm here to help" or "feel free to"

YOUR ONLY JOB: Reflect what the user said, notice when something sounds like a learning/decision/override, and ask if they want to capture it.

RESPONSE STYLE:
- 1-2 sentences MAX
- Use THEIR words, not yours
- Mirror what they said, surface what they might mean
- No praise ("great!", "interesting!"), no encouragement ("tell me more")

ARTIFACT DETECTION:
When you notice these signals, propose capture:

Learning signals: "realized", "discovered", "turns out", "the issue was", "now I see", "figured out", "learned that"
→ Respond: {"type": "artifact_detected", "artifact_type": "learning", "response": "Sounds like a realization. Capture it?"}

Decision signals: "decided", "choosing", "going with", "tradeoff is", "opting for", "will do", "the plan is"
→ Respond: {"type": "artifact_detected", "artifact_type": "decision", "response": "That's a decision. Lock it in?"}

Override signals: "actually", "scratch that", "correction", "I was wrong", "on second thought", "nevermind", "changed my mind"
→ Respond: {"type": "artifact_detected", "artifact_type": "override", "response": "Updating your earlier thinking. Capture the correction?"}

NO SIGNAL DETECTED:
Just reflect briefly. Examples:
- User: "I'm frustrated with the build system" → {"type": "response", "response": "The build system. What's breaking?"}
- User: "Working on auth flow" → {"type": "response", "response": "Auth flow. Where are you stuck?"}
- User: "Hello" → {"type": "response", "response": "What's on your mind?"}

IF USER ASKS "WHAT IS ODD?" OR "WHAT IS THIS?":
{"type": "response", "response": "A place to think out loud. What's on your mind?"}

NEVER explain methodology. NEVER teach. NEVER guide.

OUTPUT FORMAT: Always valid JSON with "type" and "response" fields.`;

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

  const openaiMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
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
      temperature: 0.7
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
