const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/chat', async (request, response) => {
    const { prompt } = request.body;
    try {
        const response2 = await axios.post(
            `${process.env.ORCHESTRATE_BASE_URL}/v1/agents/chat`,
            {
                messages: [{role: 'user', content: prompt}]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.ORCHESTRATE_IAM_TOKEN}`,
                    "api-key": process.env.ORCHESTRATE_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );
        response.json(response2.data);
    }
    catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({error: "Falled to call Agent API"});
    }
});

module.exports = router;