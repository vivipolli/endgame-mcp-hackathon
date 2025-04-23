# Model Context Protocol Specification

## Protocol Overview

ToolScan-42 is a specialized Model Context Protocol (MCP) designed to monitor and analyze the public perception of Web3 and blockchain technologies. By tracking social media sentiment, particularly on Twitter, ToolScan-42 provides valuable insights into the current state and trends of various tools, frameworks, and platforms in the blockchain ecosystem.

The protocol serves as a crucial decision-making tool for three key stakeholders:

1. **Developers**: Helps identify which technologies are gaining traction and community support, enabling informed choices about which tools to adopt or migrate to.

2. **Investors**: Provides real-time insights into technology trends, helping identify promising projects and technologies that are gaining market momentum.

3. **Entrepreneurs**: Offers market intelligence about which technologies are being well-received by the community, aiding in strategic technology stack decisions for new ventures.

## Core Components

1. **Sentiment Analysis Engine**
   - Twitter data collection through MASA API
   - Sentiment classification (trending up, stable, declining)
   - Structured insights with clear sections
   - Alternative tool suggestions
   - Retry mechanism for API calls (5 attempts, 7s delay)

2. **Data Processing Pipeline**
   - Twitter API integration for data collection
   - MASA API for sentiment analysis
   - Result aggregation and classification
   - Error handling and fallbacks
   - Structured output formatting

3. **Classification System**
   - 🚀 Trending Up (positive sentiment)
   - 💤 Stable (neutral sentiment)
   - ⚠️ Declining (negative sentiment)

## Interfaces

### ToolSentimentResult Interface
```typescript
interface ToolSentimentResult {
    tool: string;
    sentiment: SentimentClass;
    tweetCount: number;
    insights: string;  // Markdown formatted with sections
    alternatives?: string[];
    category?: string;
}
```

### SentimentClass Enum
```typescript
enum SentimentClass {
    TRENDING_UP = "🚀 trending up",
    NEUTRAL = "💤 stable",
    TRENDING_DOWN = "⚠️ declining"
}
```

## Data Flow

1. User submits a Web3 tool/framework for analysis
2. System queries Twitter for recent mentions (max 10 tweets)
3. Tweets are analyzed for sentiment using MASA API
4. Results are classified based on sentiment thresholds
5. Structured insights are generated with clear sections
6. Alternative suggestions are generated for declining tools
7. Comprehensive report is returned to user

## Context Management

The system maintains context through:
- 7-day rolling window for sentiment analysis
- Categorized tool classification
- Historical sentiment tracking
- Alternative tool mapping
- Structured insights format

## Integration Guidelines

1. **API Integration**
   - Requires MASA API key
   - Twitter API access
   - Environment variables setup

2. **Usage**
   ```typescript
   const result = await analyzeWeb3Sentiment("toolName");
   ```

3. **Error Handling**
   - Graceful fallback to neutral sentiment
   - Comprehensive logging
   - Retry mechanisms for API calls (5 attempts, 7s delay)

4. **Response Format**
   - Markdown-formatted insights
   - Clear section headers
   - Bullet points for key points
   - Consistent formatting

## Testing Guidelines

1. **API Testing**
   ```bash
   # Basic analysis
   curl -X POST http://localhost:3000/api/analyze \
     -H "Content-Type: application/json" \
     -d '{"tool": "Bittensor"}'
   ```

2. **Error Testing**
   ```bash
   # Invalid input
   curl -X POST http://localhost:3000/api/analyze \
     -H "Content-Type: application/json" \
     -d '{"tool": ""}'
   ```

3. **Response Validation**
   - Check for proper sentiment classification
   - Verify structured insights format
   - Validate section headers and bullet points
   - Confirm error handling behavior

## LLM Integration Example

The protocol can be integrated with LLMs to generate detailed market reports:

```typescript
async function generateMarketReport(tool: string) {
  const sentiment = await analyzeWeb3Sentiment(tool);
  // Use LLM to generate detailed report
  return await generateReportWithLLM(sentiment);
}
```

## Standalone MCP Requirements

1. **Environment Setup**
   - Node.js environment
   - Required API keys
   - Environment variables

2. **API Endpoints**
   - POST `/api/analyze`: Analyze sentiment
   - WebSocket support for real-time updates

3. **Documentation**
   - Installation guide
   - Usage examples
   - Integration instructions

4. **Video Demonstration**
   - Setup process
   - Basic usage
   - Integration with SN42
