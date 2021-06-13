const express = require('express');
const helmet = require('helmet');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOW-FROM https://addyvan.itch.io/blorph");
  next();
});

app.use(express.static('build'));

app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, 'build')});
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);
