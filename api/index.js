const express = require('express')
const dotenv = require('dotenv') 
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const path = require('path')

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
var socket = require('socket.io');
io = socket(server);

console.log(io)

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', function(data){
    console.log(data)
    io.emit('RECEIVE_MESSAGE', data);
  })
});
