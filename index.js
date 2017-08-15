const express = require("express");
const mustacheExpress = require("mustache-express");

var app = express();

const todos = ["Wash the car"];

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static("css"));

app.get("/", function(req, res) {
  res.render("index", {todos: todos});
});

app.post("/", function(req, res) {
  todos.push(req.body.todo);
  res.redirect("/");
})

app.listen(3000, function() {
  console.log("It's alive!!!");
})
