#!/bin/bash
# Validates oddkit MCP server setup
# Run this in a fresh Claude Code session to verify cloud compatibility

echo "=== MCP Setup Validation ==="
echo ""

# Check 1: oddkit-mcp binary
echo "1. Checking oddkit-mcp binary..."
if which oddkit-mcp > /dev/null 2>&1; then
    echo "   ✅ oddkit-mcp found at $(which oddkit-mcp)"
else
    echo "   ❌ oddkit-mcp not found"
    echo "   → SessionStart hook may not have run"
    exit 1
fi

# Check 2: oddkit CLI
echo ""
echo "2. Checking oddkit CLI..."
if oddkit --version > /dev/null 2>&1; then
    echo "   ✅ oddkit $(oddkit --version)"
else
    echo "   ❌ oddkit CLI not working"
    exit 1
fi

# Check 3: MCP server responds
echo ""
echo "3. Testing MCP server handshake..."
RESPONSE=$(echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}' | ODDKIT_BASELINE="/home/user/klappy.dev" timeout 5 oddkit-mcp 2>&1)

if echo "$RESPONSE" | grep -q '"protocolVersion"'; then
    echo "   ✅ MCP server responds correctly"
    VERSION=$(echo "$RESPONSE" | grep -o '"version":"[^"]*"' | head -1)
    echo "   → Server $VERSION"
else
    echo "   ❌ MCP server failed to respond"
    echo "   Response: $RESPONSE"
    exit 1
fi

# Check 4: Can query baseline
echo ""
echo "4. Testing baseline query..."
QUERY_RESULT=$(ODDKIT_BASELINE="/home/user/klappy.dev" oddkit librarian --query "What is ODD?" 2>&1 | head -5)

if echo "$QUERY_RESULT" | grep -q '"status"'; then
    echo "   ✅ Baseline query works"
else
    echo "   ❌ Baseline query failed"
    echo "   Response: $QUERY_RESULT"
    exit 1
fi

echo ""
echo "=== All checks passed ==="
echo ""
echo "Next: Run /mcp in Claude Code to verify server is connected to session"
