var app = require("express")();
var port = process.env.PORT || 8000;
var bodyParser = require("body-parser");
var fs = require("fs");
var users = JSON.parse(fs.readFileSync("./storage.json", "utf8"));

app.use(bodyParser.json());

app.post("/users", (req, res) => {
  let user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    state: req.body.state
  };
  users.push(user);
  fs.writeFileSync("./storage.json", JSON.stringify(users));
  res.sendStatus(200);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  let user = users.find(user => user.id === parseInt(req.params.id));
  user ? res.send(user) : res.sendStatus(400);
});

app.put("/users/:id/:name", (req, res) => {
  let user = users.find(user => user.id === parseInt(req.params.id));
  if (user) {
    user.name = req.params.name;
    res.send(user);
  } else {
    res.sendStatus(400);
  }
});

app.delete("/users/:id", (req, res) => {
  let userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
  users.splice(userIndex, 1);
  fs.writeFileSync("./storage.json", JSON.stringify(users));
  res.json(users);
});

app.listen(port, function() {
  console.log("Listening on", port);
});
