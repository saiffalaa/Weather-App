const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static("website"));
const port = 8000;
const server = app.listen(port, () => {
  console.log("Server running");
  console.log(`on port ${port}`);
});
const projectData = {};
app.post("/addEntry", function (req, res) {
  let data = req.body;
  projectData["date"] = data.date;
  projectData["temp"] = data.temp;
  projectData["feli"] = data.feli;
  console.log(projectData);
  res.send(projectData);
});
app.get("/getEntry", function (req, res) {
  console.log(projectData);
  res.send(projectData);
});
