const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const path = require('path')
const moment = require('moment')

const users = require('./routes/users')
const booking = require('./routes/booking')

// setup environment
dotenv.config()

// mongo db connect
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })

//what we use brooo
const app = express()

// To handle HTTP POST
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//cors
app.use(cors())

//passport
app.use(passport.initialize())
require('./config/passport')(passport)

// routes
app.use('/api/users', users)
app.use('/api/booking', booking)

// static www files use express
const wwwPath = path.join(__dirname, 'public');
app.use('/', express.static(wwwPath));

//which port
const PORT = process.env.PORT || 5000

// run app
server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

// socket.io goes below
const socket = require('socket.io');
global.io = socket(server);


io.on('connection', (socket) => {
  //Text chat stuff
  socket.on('SEND_MESSAGE', function (data) {
    socket.emit('RECEIVE_MESSAGE', { ...data, timestamp: moment().parseZone().format("HH:mm:ss") });
  })

  //Video chat stuff
  socket.on('join', function (data) {
    socket.join(data.roomId);
    socket.room = data.roomId;
    const sockets = io.of('/').in().adapter.rooms[data.roomId];
    if (sockets.length === 1) {
      socket.emit('init')
    } else {
      if (sockets.length === 2) {
        io.to(data.roomId).emit('ready')
      } else {
        socket.room = null
        socket.leave(data.roomId)
        socket.emit('full')
      }
    }
  });

  socket.on('signal', (data) => {
    io.to(data.room).emit('desc', data.desc)
  })

  socket.on('disconnect', () => {
    const roomId = Object.keys(socket.adapter.rooms)[0]
    if (socket.room) {
      io.to(socket.room).emit('disconnected')
    }
  })

});