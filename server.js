const express = require('express');
// const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const db = require('./config/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.once('open', () => {
    console.log('Connected to database');

    app.listen(3001, () => {
        console.log('API server running on port 3001!');
    });
});





