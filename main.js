const express = require("express");
const handlebars = require("express-handlebars");
const bp = require("body-parser");
const app = express();

let todos = ["eat bacon"];
let completed = ["buy more bacon"];

app.engine("handlebars", handlebars());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(bp.json());
app.use(bp.urlencoded({
  extended: false
}));

app.get("/", function(req, res) {
  res.render("home", {todos: todos, completed: completed});
});

app.post("/", function(req, res) {
  // If nothing is entered, then nothing is pushed into the todos array.
  if (req.body.task === "") {

  } else {
    todos.push(req.body.task);
    res.redirect("/");
  }
});

app.post("/completed", function(req, res) {
  todos.forEach(function(item, i) {
    for (var x = 0; x < req.body.completed.length; x++) {
      if (req.body.completed[x] === item) {
        completed.push(item);
        todos.splice(i, 1);
        console.log(completed);
      }
    }
  })
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("It's alive!!!");
});
