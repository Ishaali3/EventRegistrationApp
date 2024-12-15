const fs = require('fs');
const path = require('path');

// Path to store data file
const dbPath = path.join(__dirname, 'registrations.json');

// Read data from file
const readData = () => {
    try {
        const data = fs.readFileSync(dbPath);
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Write data to file
const writeData = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };

