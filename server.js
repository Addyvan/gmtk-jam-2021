const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('build'));

app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, 'build')});
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);
