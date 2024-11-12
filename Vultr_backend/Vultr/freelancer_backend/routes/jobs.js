const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const router = express.Router();

const jobs = [];  // Array to store jobs in memory

fs.createReadStream('./data/freelancer_job_postings.csv')
    .pipe(csv())
    .on('data', (data) => jobs.push(data))
    .on('end', () => {
        console.log('Job data loaded');
    });

router.get('/', (req, res) => {
    res.json(jobs);
});

router.post('/add', (req, res) => {
    const job = req.body;
    jobs.push(job);
    res.json({ message: 'Job added successfully', job });
});

module.exports = router;
