const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const router = express.Router();

const freelancers = [];  // Array to store freelancers in memory

fs.createReadStream('./data/upwork_data_scientists.csv')
    .pipe(csv())
    .on('data', (data) => freelancers.push(data))
    .on('end', () => {
        console.log('Freelancer data loaded');
    });

router.get('/', (req, res) => {
    res.json(freelancers);
});

router.get('/:id', (req, res) => {
    const freelancer = freelancers.find(f => f.id === req.params.id);
    if (freelancer) {
        res.json(freelancer);
    } else {
        res.status(404).json({ message: 'Freelancer not found' });
    }
});

module.exports = router;
