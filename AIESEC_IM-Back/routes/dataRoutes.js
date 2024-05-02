const express = require('express');
const { fetchSheetData } = require('../services/googleSheetsService');

const router = express.Router();

// Route to fetch data from Google Sheets
router.get('/fetch-sheets-data', async (req, res) => {
    try {
        const data = await fetchSheetData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch data', error: error.message });
    }
});

module.exports = router;
