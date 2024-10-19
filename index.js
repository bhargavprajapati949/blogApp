import app from './server/app.js';
import config from './config.js';

const PORT = config.get('port');

app.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT}`);
})