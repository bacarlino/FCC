var express = require('express');
var app = express();

app.use('/', express.static('dist'));
app.use('/tictactoe/index.html', express.static('dist/tictactoe'));

app.listen(3000, function () {
  console.log('Listening on port 3000');
})
