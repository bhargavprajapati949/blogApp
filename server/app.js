import express from 'express'

const app = express();

app.get('/_health', (req, res) => {
    res.json({"status": "ok"});
})

export default app;