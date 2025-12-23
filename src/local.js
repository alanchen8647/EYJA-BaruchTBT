import app from './app.js';

const port = 8000;

app.listen(port, () => {
    console.log(`Local backend server listening on http://localhost:${port}`);
});
