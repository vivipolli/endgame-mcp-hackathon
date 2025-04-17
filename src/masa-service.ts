import { categorizeWeb3Tool } from "./utils/tools.js";
import { getWeb3Alternatives } from "./utils/alternatives.js";
import { SentimentClass, ToolSentimentResult } from "./types.js";
import { log } from './logger.js';

const MASA_API_KEY = process.env.MASA_API_KEY as string;

const MASA_TWITTER_API_URL = process.env.MASA_TWITTER_API_URL as string;
const MASA_TWITTER_RESULT_URL = process.env.MASA_TWITTER_RESULT_URL as string;
const MASA_ANALYSIS_API_URL = process.env.MASA_ANALYSIS_API_URL as string;


export async function analyzeWeb3Sentiment(tool: string): Promise<ToolSentimentResult> {
    try {
      log(`Starting sentiment analysis for ${tool}`);
      
      const tweetData = await searchTwitter(tool);
      
      if (!tweetData.tweets || tweetData.tweets.length === 0) {
        log(`No tweets to analyze for ${tool}, returning neutral result`);
        return {
          tool,
          sentiment: SentimentClass.NEUTRAL,
          tweetCount: 0,
          category: categorizeWeb3Tool(tool)
        };
      }
      
      const tweetTexts = tweetData.tweets.map(tweet => tweet.text || tweet.Content);
      log(`Found ${tweetTexts.length} tweets for analysis`);
      
      const sentimentResult = await analyzeTweetsWithMasaAPI(tweetTexts, tool);
      
      const tweetCount = tweetData.tweets.length;
      const { insights } = sentimentResult;
      
      let sentimentClass = SentimentClass.NEUTRAL;
      let alternatives: string[] = [];
      
      if (insights && insights.toLowerCase().includes('positive')) {
        sentimentClass = SentimentClass.TRENDING_UP;
      } else if (insights && insights.toLowerCase().includes('negative')) {
        sentimentClass = SentimentClass.TRENDING_DOWN;
        alternatives = getWeb3Alternatives(tool);
      } else {
        sentimentClass = SentimentClass.NEUTRAL;
      }
      
      log(`Final classification for ${tool}: ${sentimentClass}`);
      
      return {
        tool,
        sentiment: sentimentClass,
        tweetCount,
        insights: insights,
        alternatives: sentimentClass === SentimentClass.TRENDING_DOWN ? alternatives : undefined,
        category: categorizeWeb3Tool(tool)
      };
    } catch (error) {
      log(`Error analyzing sentiment for ${tool}: ${error}`);
      
      return {
        tool,
        sentiment: SentimentClass.NEUTRAL,
        tweetCount: 0,
        category: categorizeWeb3Tool(tool)
      };
    }
  }
  
  async function analyzeTweetsWithMasaAPI(tweets: string[], tool: string): Promise<{ insights?: string }> {
    try {
      if (!tweets || tweets.length === 0) {
        log(`No tweets to analyze for ${tool}`);
        return { insights: undefined };
      }
  
      log(`Analyzing ${tweets.length} tweets about ${tool}`);
      
      const requestBody = {
        tweets: tweets,
        prompt: `Analyze the sentiment of these tweets about ${tool}`
      };
      
      const response = await fetch(MASA_ANALYSIS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': MASA_API_KEY
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        log(`Error in analysis API: ${response.status} - ${errorData}`);
        return { insights: undefined };
      }
      
      const responseData = await response.json();
      
      let fullAnalysis = "";
      
      if (responseData.analysis) {
        fullAnalysis = responseData.analysis;
      } else {
        fullAnalysis = "Analysis not available.";
      }
      
      log(`Analysis completed for ${tool}`);
      
      return { 
        insights: fullAnalysis
      };
    } catch (error) {
      log(`Error analyzing tweets with MASA API: ${error}`);
      return { insights: undefined };
    }
  }
  
  async function searchTwitter(tool: string): Promise<{ tweets: any[] }> {
    try {
      log(`Searching tweets for ${tool}`);
      
      const query = tool;
      
      const requestBody = {
        query: query,
        max_results: 10
      };
      
      const response = await fetch(MASA_TWITTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': MASA_API_KEY
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        log(`Error in Twitter API: ${response.status} - ${errorData}`);
        return { tweets: [] };
      }
      
      const responseData = await response.json();
      
      if (!responseData.uuid) {
        log('Could not get UUID from Twitter API response');
        return { tweets: [] };
      }
      
      const uuid = responseData.uuid;
      
      const maxRetries = 5;
      let retryCount = 0;
      let tweets: any[] = [];
      
      while (retryCount < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 7000));
        
        const resultUrl = `${MASA_TWITTER_RESULT_URL}${uuid}`;
        
        const resultResponse = await fetch(resultUrl, {
          method: 'GET',
          headers: {
            'x-api-key': MASA_API_KEY
          }
        });
        
        if (!resultResponse.ok) {
          const errorText = await resultResponse.text();
          log(`Error querying results: ${resultResponse.status} - ${errorText}`);
          retryCount++;
          continue;
        }
        
        const resultData = await resultResponse.json();
        
        if (resultData && resultData.length > 0) {
          tweets = resultData;
          log(`Search completed, ${tweets.length} tweets found`);
          break;
        } else if (resultData.status && resultData.status === 'DONE') {
          log('Search completed, but no tweets found');
          break;
        }
        
        retryCount++;
      }
      
      if (tweets.length === 0) {
        log('No tweets found after all attempts');
      } else {
        log(`Returning ${tweets.length} tweets for analysis`);
      }
      
      return { tweets };
    } catch (error) {
      log(`Error searching Twitter: ${error}`);
      return { tweets: [] };
    }
  }
  