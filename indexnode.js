const express = require('express');
const app = express();
app.use(express.static('public'));
app.use("/public", express.static('public'));

app.get('/', function(req, res)  {
  res.sendFile('index.html', {root: __dirname})
})

app.all('*', function(req, res) {
  res.send('<h1>pagina non trovata</h1>')
})

app.listen(3000);
