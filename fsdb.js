const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

function readDatabase() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([])); // Initialize database
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeDatabase(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readDatabase, writeDatabase };
