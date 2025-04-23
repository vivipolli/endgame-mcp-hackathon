import express, { Request, Response, Application } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeWeb3Sentiment } from './masa-service.js';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'app')));

app.post('/api/analyze', async (req: Request, res: Response) => {
    try {
        const { tool } = req.body;
        
        if (!tool) {
            return res.status(400).json({ error: 'Tool name is required' });
        }

        const result = await analyzeWeb3Sentiment(tool);
        res.json(result);
    } catch (error) {
        console.error('Error in analyze endpoint:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), 'app', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 