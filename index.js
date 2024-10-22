import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

import app from './server/app.js';
import config from './config.js';

const PORT = config.get('port');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, './frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT}`);
})