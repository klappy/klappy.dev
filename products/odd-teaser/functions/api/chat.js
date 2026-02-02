// ============================================
// ODD TEASER — Claude API Proxy
// Cloudflare Pages Function
//
// This function proxies requests to Claude API for:
// - Thinking companion responses
// - Artifact detection (learning/decision/override)
// ============================================

const SYSTEM_PROMPT = `You are a thinking companion, not a teacher, assistant, or chatbot.

Your purpose is to help the user externalize their epistemic artifacts (learnings, decisions, overrides) and leave with something concrete.

## Your Core Behaviors

1. **Respond briefly** — 1-3 sentences max. No lengthy explanations.
2. **Stay in the user's frame** — Use their words, not methodology terminology.
3. **Reflect, don't direct** — Mirror what they said, surface what they might mean.
4. **Don't teach or guide** — No "the next step would be..." or "you might want to..."
5. **Don't extend conversations** — No "tell me more" or "what else?"

## Artifact Detection

As you read the user's message, detect if it contains an artifact scent:

- **Learning**: User realized, discovered, or understood something new
  - Signals: "realized", "discovered", "turns out", "the issue was", "now I see", "figured out"

- **Decision**: User made or is making a choice between options
  - Signals: "decided", "choosing", "going with", "tradeoff is", "opting for"

- **Override**: User is correcting a previous belief or statement
  - Signals: "actually", "scratch that", "correction", "I was wrong", "on second thought"

## Response Format

You MUST respond with valid JSON only. No markdown, no explanation, just JSON:

{
  "response": "Your brief companion response here",
  "artifact": null | {
    "type": "learning" | "decision" | "override",
    "detected_content": "The specific part of their message that's the artifact",
    "surface_prompt": "That sounds like a learning. Want to capture it?"
  }
}

If you detect an artifact, include it. If not, artifact should be null.

## Anti-Patterns (NEVER DO THESE)

- Don't ask "tell me more" or "what else?"
- Don't say "interesting!" or "great insight!"
- Don't explain ODD methodology
- Don't suggest next steps
- Don't ask clarifying questions before artifact capture
- Don't be a chatbot — be a mirror`;

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers for local development
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const { message, history = [] } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Check for API key
    const apiKey = env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({
        error: 'API not configured',
        // Fallback for development without API key
        fallback: true,
        response: "I hear you.",
        artifact: null
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Build messages array from history
    const messages = history.map(h => ({
      role: h.isCompanion ? 'assistant' : 'user',
      content: h.content
    }));

    // Add current message
    messages.push({
      role: 'user',
      content: message
    });

    // Call Claude API
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: messages
      })
    });

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text();
      console.error('Claude API error:', errorText);
      return new Response(JSON.stringify({
        error: 'Claude API error',
        details: claudeResponse.status
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const claudeData = await claudeResponse.json();
    const responseText = claudeData.content[0]?.text || '';

    // Parse the JSON response from Claude
    let parsed;
    try {
      // Claude might wrap JSON in markdown code blocks, so strip those
      const cleanedResponse = responseText
        .replace(/^```json\n?/, '')
        .replace(/\n?```$/, '')
        .trim();
      parsed = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse Claude response as JSON:', responseText);
      // If Claude didn't return valid JSON, use the raw text as response
      parsed = {
        response: responseText.slice(0, 200), // Truncate if needed
        artifact: null
      };
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({
      error: 'Internal error',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
