/**
 * Odd-Teaser — Cloudflare Pages Worker
 *
 * Handles API routes and serves static files.
 * Fetches system prompt from MCP + uses MCP tools for lookups.
 */

// JSON output format (appended to MCP prompt)
const JSON_OUTPUT_FORMAT = `

## Output Format (odd-teaser interface)

Respond with JSON only:
{"type": "response", "response": "..."} — normal reply
{"type": "artifact_detected", "artifact_type": "learning|decision|override", "response": "..."} — user said something worth capturing
{"type": "consent", "response": "Got it."} — user agreed to capture
{"type": "decline", "response": "Okay."} — user declined

Keep responses to 1-2 sentences.`;

// Cache for MCP prompt
let cachedPrompt = null;
let cacheTime = 0;
const CACHE_TTL = 300000; // 5 minutes

async function fetchMCPPrompt() {
  if (cachedPrompt && Date.now() - cacheTime < CACHE_TTL) {
    return cachedPrompt;
  }

  const response = await fetch('https://oddkit.klappy.dev/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'prompts/get',
      params: { name: 'odd-orchestrator' }
    })
  });

  if (!response.ok) {
    throw new Error(`MCP prompt fetch failed: ${response.status}`);
  }

  const data = await response.json();
  const content = data.result?.messages?.[0]?.content?.text;

  if (!content) {
    throw new Error('No prompt content from MCP');
  }

  // Combine MCP prompt with JSON output format
  cachedPrompt = content + JSON_OUTPUT_FORMAT;
  cacheTime = Date.now();
  return cachedPrompt;
}

// OpenAI function definitions for oddkit tools
const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'oddkit_librarian',
      description: 'Look up ODD policies, definitions, and canon documentation. Use this when asked about ODD, oddkit, or any terminology.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The question to look up (e.g., "what is ODD?", "what is oddkit?")'
          }
        },
        required: ['query']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'oddkit_orchestrate',
      description: 'Route a message to the appropriate ODD handler for complex questions.',
      parameters: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'The message to process'
          }
        },
        required: ['message']
      }
    }
  }
];

// Call oddkit MCP tool
async function callOddkitTool(toolName, args) {
  const response = await fetch('https://oddkit.klappy.dev/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: { name: toolName, arguments: args }
    })
  });

  if (!response.ok) {
    throw new Error(`MCP tool call failed: ${response.status}`);
  }

  const data = await response.json();
  return data.result?.content?.[0]?.text || JSON.stringify(data.result);
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function handleChat(request, env) {
  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
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

  // Fetch system prompt from MCP
  const systemPrompt = await fetchMCPPrompt();

  // Build conversation with system prompt
  let conversationMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
  ];

  // Agentic loop - allow up to 3 tool calls
  for (let i = 0; i < 3; i++) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: conversationMessages,
        tools: TOOLS,
        tool_choice: 'auto',
        max_tokens: 1024,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: 'OpenAI error', details: errorText }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    const choice = data.choices?.[0];
    const assistantMessage = choice?.message;

    // Check if LLM wants to call a tool
    if (choice?.finish_reason === 'tool_calls' && assistantMessage?.tool_calls) {
      // Add assistant message with tool calls
      conversationMessages.push(assistantMessage);

      // Execute each tool call
      for (const toolCall of assistantMessage.tool_calls) {
        const toolName = toolCall.function.name;
        const toolArgs = JSON.parse(toolCall.function.arguments);

        console.log(`[Tool] Calling ${toolName}:`, toolArgs);

        try {
          const toolResult = await callOddkitTool(toolName, toolArgs);
          conversationMessages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: toolResult
          });
        } catch (err) {
          conversationMessages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: `Error: ${err.message}`
          });
        }
      }
      // Continue loop to get final response
      continue;
    }

    // No tool call - we have final response
    const content = assistantMessage?.content || '';

    // Parse JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(content);
    } catch {
      parsedResponse = { type: 'response', response: content };
    }

    return new Response(JSON.stringify(parsedResponse), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // Max iterations reached
  return new Response(JSON.stringify({ type: 'response', response: 'Let me think about that.' }), {
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

    // Debug endpoint to check MCP tools
    if (url.pathname === '/api/debug') {
      try {
        const toolsResponse = await fetch('https://oddkit.klappy.dev/mcp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'tools/list'
          })
        });
        const toolsData = await toolsResponse.json();
        return new Response(JSON.stringify({
          mcp_status: toolsResponse.ok ? 'OK' : 'FAILED',
          mcp_code: toolsResponse.status,
          tools: toolsData.result?.tools?.map(t => t.name) || [],
          version: 'v1.2.12-tools'
        }, null, 2), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({
          mcp_status: 'ERROR',
          error: err.message
        }, null, 2), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
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
