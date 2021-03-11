const express = require ('express');
const fakeData = require('./data');
const cors = require('cors');

const app = express();

app.use(cors());


app.get('/api', (req, res) => {

  if (!req.query.continent){
    res.send({"status": "error", "message": "Please enter a continent"})
  } else {
    res.send(fakeData[0]);
  }
});


const PORT = process.env.port || 8080;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));