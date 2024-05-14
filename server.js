const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.static("website"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define the sendData function before using it
const sendData = (request, response) => {
  response.send(projectData);
  projectData = [];
};

app.get("/all", sendData);

// Define the addData function before using it
const addData = (request, response) => {
  newEntry = {
    date: request.body.date,
    temp: request.body.temp,
    content: request.body.content,
  };
  projectData.push(newEntry);
  response.send("");
};

app.post("/add", addData);

//config port
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Initialize projectData array
let projectData = [];
