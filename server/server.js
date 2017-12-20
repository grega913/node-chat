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

    /*
    socket.emit('newEmail', {
        from:'mike@example.com',
        text:'hey, what is going on',
        createdAt:123
    })

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail)
    })
    */

    /*
    socket.emit -  only to the one user
    socket.emit('newMessage', {
        from:"admin guy",
        text:"welcome",
        createdAt: new Date()
    })
    */

    // socket.emit from Admin - - welcome to the chat app - sending message to specific/one user
    socket.emit('newMessage', {
        from :"Admin",
        text : "Welcome to our chat room - nice to see you here",
        cretedAt: new Date().getTime()
    })

    //socket.broadcast.emit from Admin text: new user joined - send message to other users
    socket.broadcast.emit('newMessage', {
        from:"Admin",
        text: "we have a new user here",
        cretedAt: new Date().getTime()
    })



    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
        //emits event to all connected users
        
        io.emit('newMessage', {
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        })
        
        //broadcasting - sending message to all but this socket!
        /*
        socket.broadcast.emit('newMessage', {
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        })
        */
    })

    socket.on('disconnect',()=>{
        console.log('User was disconnected!')
    })
})

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})