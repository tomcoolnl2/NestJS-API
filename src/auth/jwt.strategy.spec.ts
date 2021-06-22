
import { UnauthorizedException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { JwtStrategy } from './jwt.strategy'
import { User } from './user.entity'
import { UserRepository } from './user.repository'


const mockUserRepository = () => ({
    findOne: jest.fn()
})

describe('JwtStrategy', () => {
    
    let jwtStrategy: JwtStrategy
    let userRepository

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                JwtStrategy,
                { provide: UserRepository, useFactory: mockUserRepository }
            ]
        }).compile()

        jwtStrategy = await module.get<JwtStrategy>(JwtStrategy)
        userRepository = await module.get<UserRepository>(UserRepository)
    })


    describe('validate', () => {
        
        const user = new User()
        user.username = 'Test user'

        it('validates and returns the user based on JWT payload', async () => {

            userRepository.findOne.mockResolvedValue(user)
            const result = await jwtStrategy.validate({ username: user.username })

            expect(userRepository.findOne).toHaveBeenCalledWith({ username: user.username })
            expect(result).toEqual(user)
        })


        it('throws an unathorized exception as user can not be found', async () => {
            userRepository.findOne.mockResolvedValue(null)
            expect(jwtStrategy.validate(user)).rejects.toThrow(UnauthorizedException)
        })

    })
})