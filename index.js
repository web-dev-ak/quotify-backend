const express = require('express');
const quotesRoute = require('./routes/quotes');
const translateRoute = require('./routes/translate'); // Import the translation route
const app = express();

const cors = require('cors');
app.use(cors());

// Use environment variables for sensitive information
require('dotenv').config();

// Middleware to parse JSON
app.use(express.json());

// Use the quotes route
app.use('/api/quotes', quotesRoute);

// Use the translation route
app.use('/api/translate', translateRoute); // Add translation route

// app.use('/api', translateRouter); // Register the router with the correct prefix

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
