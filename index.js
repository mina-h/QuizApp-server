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

      function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      let questions = [];

      if (req.query.continent.toLowerCase() === 'asia') {
        const randomNumber = randomInteger(1, 40);
        const q1 = data[randomNumber];
        const q2 = data[randomNumber + 1];
        const q3 = data[randomNumber + 2];
        const q4 = data[randomNumber + 3];
        const q5 = data[randomNumber + 4];

        questions = [
          {
            number: 1,
            question: q1.flag,
            answer: q1.capital,
            options: [
              q1.capital,
              data[randomInteger(1,50)].capital,
              data[randomInteger(1,50)].capital,
              data[randomInteger(1,50)].capital,
            ]
          },
          {
            number: 2,
            question: q2.flag,
            answer: q2.capital,
            options: [
              data[randomInteger(1,50)].capital,
              data[randomInteger(1,50)].capital,
              q2.capital,
              data[randomInteger(1,50)].capital,
            ]
          },
          {
            number: 3,
            question: q3.flag,
            answer: q3.capital,
            options: [
              q3.capital,
              data[randomInteger(1,50)].capital,
              data[randomInteger(1,50)].capital,
              data[randomInteger(1,50)].capital,
            ]
          },
          {
            number: 4,
            question: q4.flag,
            answer: q4.capital,
            options: [
              data[randomInteger(1,50)].capital,
              data[randomInteger(1,50)].capital,
              data[randomInteger(1,50)].capital,
              q4.capital,
            ]
          },
          {
            number: 5,
            question: q5.flag,
            answer: q5.capital,
            options: [
              data[randomInteger(1,50)].capital,
              q5.capital,
              data[randomInteger(1,50)].capital,
              data[randomInteger(1,50)].capital,
            ]
          }
        ]
      }
      console.log(questions);
      res.send(questions);
    
    }
    fetchFromRestCountry(`https://restcountries.eu/rest/v2/region/${req.query.continent}`);
  }
});


const PORT = process.env.port || 8080;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));