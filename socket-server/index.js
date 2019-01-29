const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + "/public"));
app.use('/style', express.static(__dirname + '/style'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

io.on('connection', client => {
  client.on('gazeMove', data => {
    // console.log(data);
    io.emit('gazeMove', data);
  });
  client.on('calibrate', data => {
    console.log(data);
    io.emit('calibrate', data);
  });
  client.on('disconnect', () => {
      console.log('disconnected');
  });
});

http.listen(3000, () => console.log('running at http://localhost:3000'));