//Install express server
const express = require("express");
const path = require("path");
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/cronometro"));

app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname + "/dist/cronometro/index.html"))
);

// Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 5000;
console.log(PORT);
app.listen(PORT);
