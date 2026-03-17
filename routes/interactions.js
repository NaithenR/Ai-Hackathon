const express = require('express');
const router = express.Router();

router.post('/check', (req, res) => {
    const { medications } = req.body;

    let warnings = [];
    if (medications.includes('Aspirin') && medications.includes('Warfarin')) {
        warnings.push('Aspirin and Warfarin can increase the risk of bleeding.');
    }

    res.json({ 
        receivedMedications: medications,
        warnings: warnings
    });
});

module.exports = router;