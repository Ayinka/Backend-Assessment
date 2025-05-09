const express = require('express');
const database = require('./db'); // Ensure it's used
const router = require('./router');
const bcrypt = require('bcrypt');
require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const token = require('./token');
const bcpt = require('./bcrypt');
const user = require('./user');

const app = express();

app.use(express.json()); // Express has built-in JSON parsing

database(); // Ensure database connection is established
console.log(process.env.DB_USER);
app.use('/', router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});