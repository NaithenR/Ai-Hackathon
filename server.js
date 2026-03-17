const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Medication App API Running');
});

const interactionRoutes = require('./routes/interactions');

app.use('/interactions', interactionRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
