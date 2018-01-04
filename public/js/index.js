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
    var li = jQuery('<li></li>')

    li.text(`${message.from}: ${message.text}`)
    jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>')
    var a =jQuery('<a target="_blank">My current location</a>')

    li.text(`${message.from}: `)
    a.attr('href',message.url)
    li.append(a)
    jQuery('#messages').append(li)


})

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault()

    socket.emit('createMessage', {
        from:'User',
        text:jQuery('[name=message]').val()
    }, function() {

    })
})

var locationButton = jQuery('#send-location')
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!')
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    }, function () {
        alert('Unable to fetch location.')
    })

})
