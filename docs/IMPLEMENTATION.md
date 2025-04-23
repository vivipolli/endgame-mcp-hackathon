# Implementation Guide

## Architecture

ToolScan-42's implementation follows a modular architecture with the following components:

1. **Core Service Layer**
   - `masa-service.ts`: Main service handling Twitter data collection and sentiment analysis
   - `types.ts`: Type definitions and interfaces
   - `logger.ts`: Logging utilities

2. **Utility Modules**
   - `utils/tools.ts`: Tool categorization
   - `utils/alternatives.ts`: Alternative suggestions

## Components

### MasaService
- Handles Twitter data collection through MASA API
- Implements sentiment analysis with detailed insights
- Manages retry mechanisms for API calls (5 attempts, 7s delay)
- Provides error handling and fallbacks
- Returns structured insights with sections (Overall Sentiment, Key Themes, Strengths, etc.)

### Logger
- Implements logging functionality
- Supports different log levels
- Provides structured logging

### Types
- Defines core interfaces and enums
- Manages type safety
- Documents data structures

## Setup

1. **Environment Variables**
   ```bash
   MASA_API_KEY=your_api_key
   MASA_TWITTER_API_URL=twitter_api_url
   MASA_TWITTER_RESULT_URL=twitter_result_url
   MASA_ANALYSIS_API_URL=analysis_api_url
   ```

2. **Dependencies**
   - Node.js environment
   - MASA API access
   - Twitter API access

## Usage

```typescript
import { analyzeWeb3Sentiment } from './masa-service';

// Analyze a tool's sentiment
const result = await analyzeWeb3Sentiment("Bittensor");

// Result structure
{
  tool: "Bittensor",
  sentiment: "🚀 trending up",
  tweetCount: 10,
  insights: "### Comprehensive Analysis...",
  alternatives: ["Alternative1", "Alternative2"],
  category: "Blockchain"
}
```

## Example Use Case with LLM Integration

```typescript
import { analyzeWeb3Sentiment } from './masa-service';
import { OpenAI } from 'openai';

async function generateMarketReport(tool: string) {
  // Get sentiment analysis
  const sentiment = await analyzeWeb3Sentiment(tool);
  
  // Generate report using LLM
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const report = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a Web3 market analyst. Generate a detailed report based on the sentiment analysis."
      },
      {
        role: "user",
        content: `Generate a market report for ${tool} based on this sentiment analysis: ${JSON.stringify(sentiment)}`
      }
    ]
  });

  return report.choices[0].message.content;
}

// Example usage
const report = await generateMarketReport("Bittensor");
console.log(report);
```

## Standalone MCP Setup

1. **Clone and Install**
   ```bash
   git clone [repository-url]
   cd toolscan-42
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. **Build and Run**
   ```bash
   npm run build
   npm start
   ```

4. **Test the MCP**
   ```bash
   # Using curl
   curl -X POST http://localhost:3000/api/analyze \
     -H "Content-Type: application/json" \
     -d '{"tool": "Bittensor"}'
   ```

## Integration with SN42

1. **API Endpoints**
   - POST `/api/analyze`: Analyze sentiment for a Web3 tool
   - Response format matches `ToolSentimentResult` interface

2. **WebSocket Support**
   ```typescript
   // Example WebSocket client
   const ws = new WebSocket('ws://localhost:3000');
   
   ws.onmessage = (event) => {
     const result = JSON.parse(event.data);
     console.log('Analysis result:', result);
   };
   
   ws.send(JSON.stringify({ tool: 'Bittensor' }));
   ```

## Testing

1. **API Testing**
   ```bash
   # Using curl
   curl -X POST http://localhost:3000/api/analyze \
     -H "Content-Type: application/json" \
     -d '{"tool": "Bittensor"}'
   ```

2. **Expected Response Format**
   ```json
   {
     "tool": "Bittensor",
     "sentiment": "🚀 trending up",
     "tweetCount": 10,
     "insights": "### Comprehensive Analysis...",
     "alternatives": ["Alternative1", "Alternative2"],
     "category": "Blockchain"
   }
   ```

3. **Error Testing**
   ```bash
   # Test with invalid tool name
   curl -X POST http://localhost:3000/api/analyze \
     -H "Content-Type: application/json" \
     -d '{"tool": ""}'
   ```

## Performance

- Twitter API calls with retry mechanism (5 attempts)
- 7-second delay between retries
- Caching of recent results
- Error handling and fallbacks
- Structured insights with clear sections

## Integration Guidelines

1. **API Integration**
   - Requires MASA API key
   - Twitter API access
   - Environment variables setup

2. **Error Handling**
   - Graceful fallback to neutral sentiment
   - Comprehensive logging
   - Retry mechanisms for API calls

3. **Response Format**
   - Structured insights with markdown formatting
   - Clear section headers
   - Bullet points for key points
   - Consistent formatting across responses
