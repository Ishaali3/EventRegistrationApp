process.on('uncaughtException', console.error);

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'resources')));

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to the Event Registration App!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

