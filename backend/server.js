require('dotenv').config();

const express = require('express')

const mongoose = require('mongoose');

const cors = require('cors');

const locationRoutes = require('./routes/locationRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use(cors());

app.use('/api/v1/locations', locationRoutes);

mongoose
    .connect(process.env.MONGO_URI, {dbName: process.env.DB_NAME})
    .then(() => {

        console.log(`connected to the database ${process.env.DB_NAME}`);

        app.listen(process.env.PORT, (req, res) => {
            console.log(`Backend server is running on server ${process.env.PORT}`);
        })

    })
    .catch(Error => {
        console.log(Error); 
    });

module.exports = app;