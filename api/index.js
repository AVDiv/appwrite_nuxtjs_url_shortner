import { AppwriteApi } from '../model/appwrite/appwriteApi';
import { DataHandler } from '~/model/dataHandler';
const bodyParser = require('body-parser');
// const request = require('request');
const axios = require('axios');
const app = require('express')();


const appwrite = new AppwriteApi();
const dataHandler = new DataHandler();
app.use(bodyParser.urlencoded());

// Checks for available short URL names
app.get('/available_name', async (req, res) => {
    const url_name = req.query.name;
    const status = await dataHandler.available_name(url_name);
    if (status !== null) {
        res.status(200).json({ is_available: status });
    } else {
        res.status(504).json({ error: "Server Error!" });
    }
});

// Checks validity of URL name
app.post('/check_name', async (req, res) => {
    const name = req.body.name;
    if (dataHandler.valid_name(name)) {
        res.status(200).json({ is_valid: true });
    } else {
        res.status(200).json({ is_valid: false });
    }
});

// Creates new short URL
app.post('/create_url', async (req, res) => {
    const url = req.body.url;
    const url_name = req.body.name;
    const status = await dataHandler.create_url(url, url_name);
    if (status !== null) {
        res.status(200).json({ created: status });
    } else {
        res.status(504).json({ error: "Server Error!" });
    }
});

// Short URL details retrieval
app.get('/url_details', async (req, res) => {
    const url_name = req.query.name;
    const url = await dataHandler.url_details(url_name);
    if(url) {
        res.status(200).json({ url: url });
    } else if(url===false) {
        res.status(404).json({ error: "Not found!" });
    } else {
        res.status(504).json({ error: "Server Error!" });
    }
});

module.exports = app;