import express from 'express'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import AuthRouter from './routes/auth.js'
import PostsRouter from './routes/posts.js'

import { initializeDb } from './repositories/initializeDb.js';
initializeDb();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    // origin: 'http://localhost:5173',
    // optionsSuccessStatus: 200,
}));

app.use('/api/auth', AuthRouter)
app.use('/api/posts', PostsRouter)

app.get('/_health', (req, res) => {
    res.json({"status": "ok"});
})

export default app;