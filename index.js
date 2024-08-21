const express = require("express");
const app = express();
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const PORT = 8000;
// Middleware
app.use(express.urlencoded({ extended: false }));

// 




// Middle Ware
app.use((req, res, next) => {
  console.log("Hello From Middle ware 1");
  req.myUsername = "Hi My Name is Rahman ";
  //   return res.json({ msg: "Hello From Middle Ware 1" });
  //   return res.json(users);
  //   return res.json(users); is ka or next line jo likhi hay dono ka same kaam hay next() function just next query pass karta hay let's see
  next();
});

// Multi Middle Ware Mostly Used In Banking App For Login Check , User Authentication Check
// lets create step  by step Multi Middle Ware
app.use((req, res, next) => {
  console.log("Middle Ware 2 For Username Check ", req.myUsername);

  //   res.json(users);
  next();
});

app.use((req, res, next) => {
  console.log("Successfully Login");
  next();
});
app.use((req, res, next) => {
  console.log("Hi My Id Is 123");
  res.json(users);
});

app.use((req, res, next) => {
  //   return res.json({
  //     msg: " Middle Ware 3 For Password Check" + req.myUsername,
  //   });
  next();
});
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

// Routes
app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((users) => `<li>${users.first_name}<li/>`).join("")}
     </ul>
`;
  res.send(html);
});
// Routes
app.get("/api/users", (req, res) => {
  return res.json(users);
});
// Routes

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});
// Routes
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    // console.log("body", body);
    return res.json({ status: "Success", id: users.legnth });
  });
});

// Listner
app.listen(PORT, () => {
  console.log(`Server Started Successfully : ${PORT}`);
});
