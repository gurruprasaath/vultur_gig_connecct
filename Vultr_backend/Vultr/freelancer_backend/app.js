// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();  // Load environment variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Load CSV data
const freelancersFilePath = path.join(__dirname, 'data', 'upwork_data_scientists.csv');
let freelancers = [];

fs.createReadStream(freelancersFilePath)
    .pipe(csv())
    .on('data', (row) => {
        freelancers.push(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });

// API endpoint to get freelancers data
app.get('/api/freelancers', (req, res) => {
    res.json(freelancers);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
