const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

const PORT = process.env.PORT || 3000;
const BE_HOST = process.env.BE_HOST || "http://localhost:12345";
console.log(BE_HOST)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  axios.get(BE_HOST)
  .then(response => {
    console.log(response.data.message);
    res.send({ express: response.data.message , host: BE_HOST});
  })
  .catch(error => {
    console.log(error);
  });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});


// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
