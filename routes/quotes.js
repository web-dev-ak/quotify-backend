const express = require('express');
const request = require('request');

const router = express.Router();

// Route to get the quote by category or a random quote if no category is provided
router.get('/:category?', (req, res) => {
    const category = req.params.category || ''; // Use an empty string if no category is provided

    // Build the request URL based on the category
    const apiUrl = category
        ? `https://api.api-ninjas.com/v1/quotes?category=${category}`
        : 'https://api.api-ninjas.com/v1/quotes'; // Fallback to random quote

    // Fetch the quote from the API
    request.get({
        url: apiUrl,
        headers: {
            'X-Api-Key': process.env.API_KEY
        },
    }, function (error, response, body) {
        if (error) {
            return res.status(500).json({ error: 'Request failed.' });
        } else if (response.statusCode != 200) {
            return res.status(response.statusCode).json({ error: body.toString('utf8') });
        } else {
            const quoteData = JSON.parse(body)[0]; // Parse the first quote
            res.json({
                quote: quoteData.quote,
                author: quoteData.author
            });
        }
    });
});

module.exports = router;
