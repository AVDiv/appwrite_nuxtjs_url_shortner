import { AppwriteApi } from './appwrite/appwriteApi';
const bodyParser = require('body-parser');
const app = require('express')();

const appwrite = new AppwriteApi();
var is_available;
app.use(bodyParser.urlencoded());
app.post('/available_name', async (req, res) => {
  const url_name = req.body.name;
  const search_res = await appwrite.listDocuments(url_name);
  is_available = search_res.total<1;
  res.json({is_available: is_available});
});

module.exports = app;