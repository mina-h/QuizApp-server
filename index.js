const express = require ('express');
const fakeData = require('./data');
const cors = require('cors');
const fetch = require('node-fetch');


const app = express();

app.use(cors());


app.get('/api', (req, res) => {
  if (!req.query.continent){
    res.send({"status": "error", "message": "Please enter a continent"})
  } else {
    const fetchFromRestCountry = async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      res.send(data);
    }
    fetchFromRestCountry(`https://restcountries.eu/rest/v2/region/${req.query.continent}`);
  }
});


const PORT = process.env.port || 8080;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));