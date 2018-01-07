const path=require('path')
const http=require('http')
const express = require('express')
const socketIO = require('socket.io')


const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users}= require('./utils/users')

const publicPath=path.join(__dirname,'../public')
const port = process.env.PORT || 3000
const app = express()
var server = http.createServer(app)
var io = socketIO(server)
var users = new Users()

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
    /*socket.emit('newMessage', {
        from :"Admin",
        text : "Welcome to our chat room - nice to see you here",
        cretedAt: new Date().getTime()
    })*/
    
    //socket.emit('newMessage', generateMessage('Admin - server','Welcome to the chat app'))



    //socket.broadcast.emit from Admin text: new user joined - send message to other users (sockets)
    /*socket.broadcast.emit('newMessage', {
        from:"Admin",
        text: "we have a new user here",
        cretedAt: new Date().getTime()
    })*/
    //socket.broadcast.emit('newMessage', generateMessage('Admin - server', 'A new user has joined the group'))


    //join the room - specific room

    //emit to specific room:
    //io.emit->io.to('The Office Fans').emit
    //socket.broadcast.emit->socket.broadcast.to('The Office Fans').emit
    //socket.emit -  same - we just want to emit to one specific user

    //
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
             return callback('Name and room name are required')
        }

        

        socket.join(params.room)
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room)
        

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))

        socket.emit('newMessage', generateMessage('Admin - server','Welcome to the chat app'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin - server', `${params.name} has joined the group`))


        callback()
    })



    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message)

        var user = users.getUser(socket.id)

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))  
        }
        //emits event to all connected users
        //io.emit('newMessage', generateMessage(message.from, message.text))
        callback('This is from the server!')
    })

        socket.on('createLocationMessage', (coords)=> {
            var user=users.getUser(socket.id)
        if(user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude ))
        }

    })



    socket.on('disconnect',()=>{
        console.log('User was disconnected!')
        var user = users.removeUser(socket.id)

        if(users){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`))
        }
    })
})

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})