const bodyParser = require('body-parser');
const app = require('express')();

app.use(bodyParser.json());
app.get('/available_name', async (req, res) => {
  res.json({ data: 'data' });
});

module.exports = app;