let express = require('express');
let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let userCount = 0;
let boxNo = 0;

let socketBoxDict = {};
let boxDict = {};

let bel = 50; // boxEdgeLength

app.use( express.static('public') );

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  userCount += 1;
  console.log('A user connected, user count:', userCount);

  boxNo += 1;
  let boxId = "box" + boxNo;
  let bt = Math.random(); //boxTop
  let bl = Math.random(); //boxLeft

  let newBox = { boxId: boxId, boxTop: bt, boxLeft: bl, boxEdgeLength: bel * ( 1 + Math.random() ) };

  socketBoxDict[socket.id] = boxId;
  boxDict[boxId] = newBox;

  socket.emit("initData", boxDict);
  socket.broadcast.emit("newBox", newBox);

  socket.on('disconnect', () => {
    userCount -= 1;
    console.log('A User disconnected, user count:', userCount);

    let socketId = socket.id;
    let boxId = socketBoxDict[socket.id];
    io.emit("deleteBox", boxId);
    delete socketBoxDict[socketId];
    delete boxDict[boxId];
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
