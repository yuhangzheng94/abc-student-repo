let express = require('express');
let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let userCount = 0;

app.use( express.static('public') );

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  userCount += 1;
  console.log('A user connected, user count:', userCount);

  initData = { userCount: userCount };
  socket.emit("initData", initData);

  socket.broadcast.emit("countChange", "connect");

  socket.on('disconnect', () => {
    userCount -= 1;
    console.log('A User disconnected, user count:', userCount);
    io.emit("countChange", "disconnect");
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
