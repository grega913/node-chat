var expect = require('expect')

var {isRealString}=require('./validation')

//import isRealString

//isRealString
    //should reject non-string values
    //should reject string with only spaces
    //should allow strings with non-space characters

describe('isRealString', () => {
    it('should reject non string values', ()=> {
        var res = isRealString(['a'], ['b'])
        expect(res).toBe(false)
    })

    it('should reject string with only spaces', ()=> {
        var res = isRealString('   ')
        expect(res).toBe(false)
    })

    it('should allow strings with non-space characters', ()=> {
        var res = isRealString('  123 ds')
        expect(res).toBe(true)
    })

})


