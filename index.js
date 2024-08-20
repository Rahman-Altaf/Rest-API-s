const express = require("express");
const app = express();
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const PORT = 8000;
// Middleware
app.use(express.urlencoded({ extended: false }));

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
    return res.json({ status: "Status Pending" });
  });
});

// Listner
app.listen(PORT, () => {
  console.log(`Server Started Successfully : ${PORT}`);
});
