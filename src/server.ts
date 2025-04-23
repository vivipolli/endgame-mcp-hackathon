import express from 'express';
import cors from 'cors';
import { analyzeWeb3Sentiment } from './masa-service.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const baseUrl = process.env.RAILWAY_STATIC_URL || `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

// Serve static files from the app directory
app.use(express.static(path.join(__dirname, '../app')));

// API endpoint for sentiment analysis
app.post('/api/analyze', async (req, res) => {
    try {
        const { tool } = req.body;
        if (!tool) {
            return res.status(400).json({ error: 'Tool name is required' });
        }

        const result = await analyzeWeb3Sentiment(tool);
        res.json(result);
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        res.status(500).json({ error: 'Failed to analyze sentiment' });
    }
});

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on ${baseUrl}`);
}); 