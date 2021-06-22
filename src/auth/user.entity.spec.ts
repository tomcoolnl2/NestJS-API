
import * as bcrypt from 'bcryptjs'
import { User } from './user.entity'


describe('User entity', () => {

    let user: User

    beforeEach(() => {
        user = new User()
        user.salt = 'testSalt'
        user.password = 'testPassword'
        bcrypt.hash = jest.fn()
    })

    describe('validatePassword', () => {
        
        it('returns true if password is valid', async () => {
            
            bcrypt.hash.mockReturnValue(user.password)
            expect(bcrypt.hash).not.toHaveBeenCalled()
            
            const result = await user.validatePassword(user.password)
            expect(bcrypt.hash).toHaveBeenCalledWith(user.password, user.salt)
            expect(result).toEqual(true)
        })

        it('returns false if password is invalid', async () => {
            
            bcrypt.hash.mockReturnValue('Wrong Password')
            expect(bcrypt.hash).not.toHaveBeenCalled()
            
            const result = await user.validatePassword('Wrong Password')
            expect(bcrypt.hash).toHaveBeenCalledWith('Wrong Password', user.salt)
            expect(result).toEqual(false)
        })
    })
})