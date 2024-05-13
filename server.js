projectData = [];

const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");

app.use(cors());

app.use(express.static("website"));

app.use(bodyParser.json());

// Parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/all", sendData);

const sendData = (request, response) => {
  response.send(projectData);
  projectData = [];
};

app.post("/add", addData);

const addData = (request, response) => {
  newEntry = {
    date: request.body.date,
    temp: request.body.temp,
    content: request.body.content,
  };
  projectData.push(newEntry);
  response.send("");
};
//config port
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
