var socket = io(); //initiating a request from the client and 
//keep the connection open - > and store it in a variable

socket.on('connect', function() {
    console.log('Connected to server!')

    /*
    socket.emit('createEmail', {
        to:'jan@example.com',
        text:'Hey, this is andrew'
    })
    */

    /*
    socket.emit('createMessage', {
        from:'Janko the client',
        text:'I am just sending this to say hello!!'
    })
    */
    
})

socket.on('disconnect', function() {
    console.log('Disconnected from server!')
})


//listen to custom event
/*
socket.on('newEmail', function(email) {
    console.log("new email", email)
})
*/

socket.on('newMessage', function(message) {
    console.log("new message", message)
})
