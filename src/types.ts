export enum SentimentClass {
    TRENDING_UP = "🚀 trending up",
    NEUTRAL = "💤 stable",
    TRENDING_DOWN = "⚠️ declining"
}

export interface ToolSentimentResult {
    tool: string;
    sentiment: SentimentClass;
    tweetCount: number;
    insights?: string;
    alternatives?: string[];
    category?: string;
}