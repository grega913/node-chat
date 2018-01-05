var moment = require('moment')

//www.momentjs.com


//Jan 1st 1970 00:00:00 am
/*
var date = new Date();
var months =['Jan', 'Feb', 'Mar']
console.log(date.getMonth())
*/
//10:35 am

var date = moment()
//date.add(1,'year').subtract(9,'months')
console.log(date.format('MMMM YYYY'))
console.log(date.format('MMM Do, YYYY'))
//date.substract(1,'hour')

console.log(date.format('h:mm a'))

var someTimestamp=moment().valueOf()
console.log(someTimestamp)

var createdAt = 1234
var date = moment(createdAt)
console.log(date.format('h:mm a'))

