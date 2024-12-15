const express = require('express');
const { readDatabase, writeDatabase } = require('../fsdb');

const router = express.Router();

const generateTicketNumber = () => Math.floor(Math.random() * 1000000);

// POST /api/register
router.post('/register', (req, res) => {
    const { name, email, date, eventName } = req.body;
    const database = readDatabase();
    const ticketNumber = generateTicketNumber();

    const registration = { ticketNumber, name, email, date, eventName };
    database.push(registration);
    writeDatabase(database);

    res.json({ message: 'Registration successful!', registration });
});

// GET /api/registrations
router.get('/registrations', (req, res) => {
    const database = readDatabase();
    res.json(database);
});

module.exports = router;
