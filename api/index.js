import { AppwriteApi } from './appwrite/appwriteApi';
const bodyParser = require('body-parser');
// const request = require('request');
const axios = require('axios');
const app = require('express')();


const appwrite = new AppwriteApi();
app.use(bodyParser.urlencoded());

// Checks for available short URL names
app.get('/available_name', async (req, res) => {
    let is_available = false;
    const url_name = req.query.name;
    try {
      if (url_name){
          const search_res = await appwrite.listDocuments(url_name);
          is_available = search_res.total<1;
          res.status(200).json({is_available: is_available});
      }
      else {
          res.status(200).json({is_available: false});
      }
  }
  catch (err) {
      console.log(err);
      res.status(504).json({error: "Server Error!"});
  }
});

// Checks validity of URL name
app.post('/check_name', async (req, res) => {
    const name = req.body.name;
    const pattern = /^\b[a-z0-9-_]*$/g;
    if (name && name.match(pattern)!==null){
        res.status(200).json({is_valid: true});
    } else {
        res.status(200).json({is_valid: false});
    }
});

// Creates new short URL
app.post('/create_url', async (req, res) => {
    const url = req.body.url;
    const url_name = req.body.name;
    let is_available = false;
    let is_valid = false;
    let error = null;
    try {
         await axios.get("http://localhost:3000/api/available_name", {
            params: {
                name: url_name,
            }
        }).then((response) => {
            response.status !== 200 ? error = response.status : error = null;
            if(error===null) is_available = response.data.is_available;
        });
        await axios.post("http://localhost:3000/api/check_name",
            {
                name: url_name,
            }
        ).then((response) => {
            response.status !== 200 ? error = response.status : error = null;
            if(error===null) is_valid = response.data.is_valid;
        });
    }
    catch (err) {
        console.log(err);
        res.status(504).json({error: "Server Error!"});
    }
    if (error===null) {
        try{
            if (is_available && is_valid){
                await appwrite.createDocument(url, url_name);
                res.status(201).json({creation: "success"});
            } else if(!is_available) {
                res.status(409).json({error: "Name already taken!"});
            } else if(!is_valid){
                res.status(406).json({error: "Name is not in the requested format!"})
            }
        }
        catch (err) {
            console.log(err);
            res.status(504).json({error: "Could not create link!"});
        }
    } else {
        res.status(504).json({error: "Could not create link!"});
    }
});

// Short URL details retrieval
app.get('/url_details', async (req, res) => {
    const url_name = req.query.name;
    try {
        if (url_name){
            const search_res = await appwrite.listDocuments(url_name);
            const data = search_res.documents[0];
            const url = data.url;
            if (search_res.total>0){
                res.status(200).json({url: url});
            } else {
                res.status(404).json({error: "Not found!"});
            }
        }
        else {
            res.status(404).json({error: "Not found!"});
        }
    }
    catch (err) {
        console.log(err);
        res.status(504).json({error: "Server Error!"});
    }
});

module.exports = app;