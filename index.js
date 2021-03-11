const express = require ('express');
const cors = require('cors');
const fetch = require('node-fetch');


const app = express();

app.use(cors());

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateQuestions = (data, num) => {
  const randomNumber = randomInteger(1, num);
  const q1 = data[randomNumber];
  const q2 = data[randomNumber + 1];
  const q3 = data[randomNumber + 2];
  const q4 = data[randomNumber + 3];
  const q5 = data[randomNumber + 4];

  let questions = [
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
  return questions;
}

app.get('/api', (req, res) => {
  if (!req.query.continent){
    res.send({"status": "error", "message": "Please enter a continent"})
  } else {
    const fetchFromRestCountry = async (url) => {
      const response = await fetch(url);
      const fetchedData = await response.json();

      let questions = [];

      if (req.query.continent.toLowerCase() === 'asia') {
        questions = generateQuestions(fetchedData, 45);
      } else if (req.query.continent.toLowerCase() === 'africa'){
        questions = generateQuestions(fetchedData, 55);
      } else if (req.query.continent.toLowerCase() === 'europe'){
        questions = generateQuestions(fetchedData, 45);
      } else if (req.query.continent.toLowerCase() === 'americas'){
        questions = generateQuestions(fetchedData, 50);
      } else if (req.query.continent.toLowerCase() === 'oceania'){
        questions = generateQuestions(fetchedData, 20);
      }
      
      res.send(questions);
    
    }
    fetchFromRestCountry(`https://restcountries.eu/rest/v2/region/${req.query.continent}`);
  }
});


const PORT = process.env.port || 8080;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));