/**
 * Odd-Teaser — OpenAI API Proxy
 *
 * Cloudflare Pages Function that proxies requests to OpenAI API.
 * Implements rate limiting (100 requests/hour per IP).
 *
 * Environment Variables Required:
 * - OPENAI_API_KEY: Your OpenAI API key
 */

const SYSTEM_PROMPT = `You are a thinking companion, not a teacher, assistant, or chatbot.

Your purpose is to help the user externalize their epistemic artifacts (learnings, decisions, overrides) and leave with something concrete.

## Core Behaviors

1. Keep responses SHORT (1-3 sentences) unless user asks for more
2. Stay in the user's frame — use their words, not methodology terminology
3. Surface, don't synthesize — reflect what they said, don't add meaning
4. Support exit — make it easy to capture and leave at any moment

## Artifact Detection

You MUST detect artifact signals and surface them for confirmation. Look for:

- Learning signals: "realized", "discovered", "turns out", "the issue was", "now I see", "figured out"
- Decision signals: "decided", "choosing", "going with", "tradeoff is", "opting for"
- Override signals: "actually", "scratch that", "correction", "I was wrong", "on second thought"

When you detect an artifact signal, respond in this JSON format:
{"type": "artifact_detected", "artifact_type": "learning|decision|override", "response": "That sounds like a learning. Want to capture it?"}

For normal responses without artifact detection:
{"type": "response", "response": "Your 1-3 sentence reply here"}

## Forbidden Behaviors

- Do NOT extend conversations with "tell me more" or "what else?"
- Do NOT add engagement hooks like "interesting!" or "great insight!"
- Do NOT explain ODD concepts or methodology
- Do NOT suggest next steps
- Do NOT give hollow responses like "Go on.", "Mmm.", or "I hear you."
- Every response must show you understood the specific content

## Important

Always respond with valid JSON matching one of the formats above.`;

const RATE_LIMIT = 100;
const RATE_WINDOW = 60 * 60 * 1000;

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const apiKey = env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';

    // Rate limiting with KV (if available)
    if (env.RATE_LIMIT_KV) {
      const rateLimitKey = `rate:${clientIP}`;
      const rateData = await env.RATE_LIMIT_KV.get(rateLimitKey, 'json');

      const now = Date.now();
      if (rateData) {
        const recentRequests = rateData.timestamps.filter(t => now - t < RATE_WINDOW);

        if (recentRequests.length >= RATE_LIMIT) {
          return new Response(JSON.stringify({
            error: 'Rate limit exceeded. Try again later.',
            retryAfter: Math.ceil((recentRequests[0] + RATE_WINDOW - now) / 1000)
          }), {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        recentRequests.push(now);
        await env.RATE_LIMIT_KV.put(rateLimitKey, JSON.stringify({ timestamps: recentRequests }), {
          expirationTtl: 3600
        });
      } else {
        await env.RATE_LIMIT_KV.put(rateLimitKey, JSON.stringify({ timestamps: [now] }), {
          expirationTtl: 3600
        });
      }
    }

    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid request: messages array required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // OpenAI format: system message first, then conversation
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
      console.error('OpenAI API error:', errorText);
      return new Response(JSON.stringify({ error: 'OpenAI API error', details: errorText }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || '';

    // Try to parse as JSON
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

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error', message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
