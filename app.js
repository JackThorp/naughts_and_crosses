const express = require('express');

const app = express(); 
const port = 8080;
const server = '120.0.0.1';


app.get('/', function(req, res) {

  res.send('Easy');
});

app.use(express.static('public'));
  
app.listen(port, function(){
  console.log(`server listening on port ${port}`);
})
