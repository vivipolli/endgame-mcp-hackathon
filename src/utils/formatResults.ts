import { ToolSentimentResult } from "../types.js";


export function formatResults(results: ToolSentimentResult[]): string {
    let response = "# Web3 Technology Perception Analysis\n\n";
    
    const categorizedResults: {[key: string]: ToolSentimentResult[]} = {};
    
    results.forEach(result => {
      const category = result.category || "Others";
      if (!categorizedResults[category]) {
        categorizedResults[category] = [];
      }
      categorizedResults[category].push(result);
    });
    
    for (const [category, toolResults] of Object.entries(categorizedResults)) {
      response += `## ${category}\n\n`;
      
      for (const result of toolResults) {
        response += `### ${result.tool} - ${result.sentiment}\n\n`;
        response += `- Total tweets analyzed: ${result.tweetCount}\n`;
        response += `- Sentiment: ${result.sentiment}\n\n`;
        
        if (result.insights) {
          response += `**MASA API Analysis:**\n${result.insights}\n\n`;
        }
      }
    }
    
    response += "---\n";
    response += "Note: This analysis is based on tweets from the last 7 days and may not reflect the actual technical performance of the technologies.";
    
    return response;
  }