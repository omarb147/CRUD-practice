const express = require("express");
const app = express();
const controller = require("./controllers/index");
const port = 3000;

//App routes
app.get("/", (req, res) => res.send("Hello World"));
app.get("/crud", (req, res) => controller.getTableData(req, res, db));
app.post("/crud", (req, res) => controller.postTableData(req, res, db));
app.put("/crud", (req, res) => controller.putTableData(req, res, db));
app.delete("/crud", (req, res) => controller.deleteTableData(req, res, db));

//DB connection
var db = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "",
    password: "",
    database: "crud_app"
  }
});

app.listen(port, () => console.log(`App listening on Port ${port}`));
