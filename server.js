const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// In-memory data storage (you can use fsdb.js for a real file-based database)
let registrations = [];

// POST route to register a user
app.post('/register', (req, res) => {
    const { eventName, userName } = req.body;
    const registration = { eventName, userName };

    registrations.push(registration);
    fs.writeFileSync('registrations.json', JSON.stringify(registrations, null, 2));

    res.status(201).json({ message: "Registration successful!", registration });
});

// POST route to cancel a registration
app.post('/cancel', (req, res) => {
    const { eventName, userName } = req.body;
    registrations = registrations.filter(reg => !(reg.eventName === eventName && reg.userName === userName));
    fs.writeFileSync('registrations.json', JSON.stringify(registrations, null, 2));

    res.status(200).json({ message: "Registration canceled" });
});

// GET route to view all attendees
app.get('/attendees', (req, res) => {
    res.status(200).json(registrations);
});

// GET route to retrieve registration details
app.get('/registration/:eventName/:userName', (req, res) => {
    const { eventName, userName } = req.params;
    const registration = registrations.find(reg => reg.eventName === eventName && reg.userName === userName);
    
    if (registration) {
        res.status(200).json(registration);
    } else {
        res.status(404).json({ message: "Registration not found" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const { readData, writeData } = require('./fsdb');

// Get data from the file on server start
let registrations = readData();



