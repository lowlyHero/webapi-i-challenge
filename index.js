const express = require('express');
const server = express();

const db = require('./data/db');

server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h1>Hello Pale Blue Dot</h1>');
})

server.listen(4000, () => {
    console.log('\n*** Server is running on port 4000 ***\n');
})