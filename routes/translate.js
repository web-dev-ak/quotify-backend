const express = require('express');
const router = express.Router();

// POST route to handle translation
router.post('/', async (req, res) => {
    const { quote, fromLang, toLang } = req.body;

    if (!quote || !fromLang || !toLang) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Dynamically import node-fetch
    const fetch = (await import('node-fetch')).default;

    // Translation API URL
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(quote)}&langpair=${fromLang}|${toLang}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const translatedQuote = data.responseData.translatedText;

        res.json({
            hindi: {
                quote: translatedQuote,
                author: "Adarsh Singh" // Replace with dynamic author if needed
            }
        });
    } catch (error) {
        console.error('Error during translation:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

module.exports = router;
