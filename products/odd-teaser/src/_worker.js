/**
 * Odd-Teaser — Cloudflare Pages Worker
 *
 * Handles API routes and serves static files.
 * This is the "advanced mode" approach for Cloudflare Pages.
 */

const SYSTEM_PROMPT = `You are a thinking companion. You help people externalize their thinking by reflecting what they say and noticing when they've landed on something worth capturing.

HOW TO RESPOND:
- Keep responses SHORT (1-2 sentences)
- Reflect what they said using THEIR words
- Ask a focused question about what they mentioned
- Be warm but not effusive

ARTIFACT DETECTION:
When someone expresses a realization, decision, or correction, ask if they want to capture it:

Learning (realizations): "realized", "discovered", "turns out", "figured out", "now I understand"
→ {"type": "artifact_detected", "artifact_type": "learning", "response": "Sounds like you figured something out. Want to capture that?"}

Decision (choices): "decided", "going with", "choosing", "the plan is", "I'll do"
→ {"type": "artifact_detected", "artifact_type": "decision", "response": "That's a decision. Lock it in?"}

Override (corrections): "actually", "wait no", "I was wrong", "scratch that", "on second thought"
→ {"type": "artifact_detected", "artifact_type": "override", "response": "Correcting earlier thinking. Capture the update?"}

NORMAL CONVERSATION:
When no artifact signal, just engage naturally:
- "Hello" → {"type": "response", "response": "Hey. What's on your mind?"}
- "Working on a tricky bug" → {"type": "response", "response": "What's the bug doing?"}
- "Frustrated with deployments" → {"type": "response", "response": "Deployments. What keeps failing?"}
- "What is this?" → {"type": "response", "response": "A space to think out loud. I'll notice when you land on something worth keeping."}
- "What is ODD?" → {"type": "response", "response": "A way of working. But honestly, just talk through what you're thinking about."}

DON'T:
- Repeat the same response twice in a row
- Say "What's on your mind?" if they just told you what's on their mind
- Give generic responses — always reference what they actually said
- Be overly formal or robotic

OUTPUT: Always respond with valid JSON: {"type": "response" | "artifact_detected", "artifact_type"?: "learning" | "decision" | "override", "response": "your message"}`;

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
