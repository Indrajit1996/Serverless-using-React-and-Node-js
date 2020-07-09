var app = require('http').createServer()
// const encrypt = require('socket.io-encrypt')
var io = module.exports.io = require('socket.io')(app)


const PORT = process.env.PORT || 3231
// const secret = 'abcdefg';
const SocketManager = require('./SocketManager')

// io.use(encrypt(secret))


io.on('connection', SocketManager)
app.listen(PORT , () => {
    console.log("Connected to port:" + PORT)
})