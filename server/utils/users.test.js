const expect = require('expect')

const {Users} = require('./users')

describe('Users', () => {
    var users;

    beforeEach(()=> {
        users = new Users()
        users.users = [{
            id:'1',
            name:'Mike',
            room:'Node Course'
        },{
            id:'2',
            name:'Jen',
            room:'React Course'
        },{
            id:'3',
            name:'Julie',
            room:'Node Course'
        },{
            id:'4',
            name:'Zoe',
            room:'Node Course'
        },
    ]
    })

    it('should add new user', () => {
        var users = new Users()
        var user= {
            id:'123',
            name:'Grega',
            room:'The Office Fans'
        }
        var resUser = users.addUser(user.id, user.name, user.room)

        expect(users.users).toEqual([user])
    })

    it('should remove a user', () => {
        var userId='1'
        var user = users.removeUser(userId)

        expect(user.id).toBe(userId)
        expect(users.users.length).toBe(3)
    })

    it('should not remove a user', () => {
        var userId='99'
        var user = users.removeUser(userId)

        expect(user).toNotExist()
        expect(users.users.length).toBe(4) 
    })

    it('should find user', () => {
        var userId = '2'
        var user=users.getUser(userId)

        expect(user.id).toBe(userId)
    })

    it('should not find user', () => {
        var userId='5'
        var user=users.getUser(userId)

        expect(user).toNotExist()




    })

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course')

        expect(userList).toEqual(['Mike', 'Julie', 'Zoe'])
    })

    it('should return names for react course', () => {
        var userList = users.getUserList('React Course')

        expect(userList).toEqual(['Jen'])
    })

})