import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { log } from './logger.js';
import { ToolSentimentResult } from "./types.js";
import { formatResults } from "./utils/formatResults.js";
import { analyzeWeb3Sentiment } from "./masa-service.js";

const server = new McpServer({
  name: "web3-sentiment-analyzer",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "analyze-web3-tech",
  "Analyze public perception of Web3 technologies based on Twitter sentiment",
  {
    tools: z
      .string()
      .describe("Comma-separated list of Web3 technologies to analyze (e.g., 'Ethereum, Solana, MetaMask')")
  },
  async ({ tools }) => {
    log(`Analyzing public perception for Web3 technologies: ${tools}`);
    
    try {
      const toolList = tools.split(',').map(t => t.trim()).filter(t => t.length > 0);
      
      if (toolList.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "Please provide at least one Web3 technology for analysis."
            }
          ]
        };
      }
      
      const maxTools = 5;
      const toolsToAnalyze = toolList.slice(0, maxTools);
      
      if (toolList.length > maxTools) {
        log(`Technology list was truncated from ${toolList.length} to ${maxTools}`);
      }
      
      const results: ToolSentimentResult[] = [];
      
      for (const tool of toolsToAnalyze) {
        log(`Analyzing sentiment for: ${tool}`);
        
        const sentimentData = await analyzeWeb3Sentiment(tool);
        results.push(sentimentData);
      }
      
      const formattedResults = formatResults(results);
      
      return {
        content: [
          {
            type: "text",
            text: formattedResults
          }
        ]
      };
    } catch (error) {
      const errorMsg = `Error analyzing Web3 technologies: ${error}`;
      log(errorMsg);
      return {
        content: [{ type: "text", text: errorMsg }]
      };
    }
  }
);


async function main() {
  log("Starting Web3 technology analysis MCP server");
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Web3 Technology Sentiment Analyzer MCP Server running on stdio");
  log("MCP server started");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  log(`Fatal error: ${error}`);
  process.exit(1);
});
