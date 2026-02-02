#!/bin/bash
# Wrapper that ensures oddkit is installed before running MCP server
# Solves the chicken-and-egg timing issue in cloud environments

# Check if oddkit-mcp exists
if ! command -v oddkit-mcp &> /dev/null; then
    # Install oddkit (stderr to avoid polluting MCP stdout)
    npm install -g github:klappy/oddkit >&2 2>&1
fi

# Run the actual MCP server
exec oddkit-mcp "$@"
