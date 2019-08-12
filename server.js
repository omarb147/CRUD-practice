const express = require("express");
const app = express();
const controller = require("./controllers/index");
const port = 4000;
const bodyParser = require("body-parser"); // turns response into usable format
const cors = require("cors");

const whitelist = ["http://localhost:3000", "http://localhost:4000"];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log(`origin = ${origin}`);
      callback(new Error("Not Allowed by CORS"));
    }
  }
};

// const corsOptions = {
//   origin: "http://localhost:4000"
// };

app.use(cors(corsOptions));
app.use(bodyParser.json());

//DB connection
var db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "",
    password: "",
    database: "crud-practice-1"
  }
});

//App routes
app.get("/", (req, res) => res.send("Hello World"));
app.get("/crud", (req, res) => controller.getTableData(req, res, db));
app.post("/crud", (req, res) => controller.postTableData(req, res, db));
app.put("/crud", (req, res) => controller.putTableData(req, res, db));
app.delete("/crud", (req, res) => controller.deleteTableData(req, res, db));

app.listen(port, () => console.log(`App listening on Port ${port}`));
