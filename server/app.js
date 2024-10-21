import express from 'express'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import AuthRouter from './routes/auth.js'
import PostsRouter from './routes/posts.js'

import { initializeDb } from './repositories/initializeDb.js';
initializeDb();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(AuthRouter)
app.use(PostsRouter)

app.get('/_health', (req, res) => {
    res.json({"status": "ok"});
})

export default app;