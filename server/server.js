const path=require('path')
const http=require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath=path.join(__dirname,'../public')
const port = process.env.PORT || 3000
const app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

//this will let us register an event listener

//this one listen to the new connection (client to the server, and then let's you do something)
io.on('connection', (socket)=> {
    console.log("new user connected")

    socket.on('disconnect',()=>{
        console.log('User was disconnected!')
    })
})

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})