
import * as bcrypt from 'bcryptjs'
import { ConflictException, InternalServerErrorException } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { User } from "./user.entity"
import { UserRepository } from "./user.repository"


const mockCredentialsDto: AuthCredentialsDto = { username: 'Test user', password: '123456' }

describe('UserRepository', () => {

    let userRepository

    beforeEach(async () => {
        
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserRepository]
        }).compile()

        userRepository = module.get<UserRepository>(UserRepository)
    })

    describe('signUp', () => {

        let save

        beforeEach(() => {
            save = jest.fn()
            userRepository.create = jest.fn().mockReturnValue({ save })
        })

        it('successfully signs up the user', async () => {
            await save.mockResolvedValue(undefined)
            expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow()
        })

        it('throws a conflict exception as username already exists', async () => {
            
            await save.mockRejectedValue({ code: '23505' })

            try {
                userRepository.signUp(mockCredentialsDto)
            } 
            catch(error) {
                expect(error).toBeInstanceOf(ConflictException)
            }
        })

        it('throws a conflict exception as username already exists', async () => {

            await save.mockRejectedValue({ code: 'Unhandled error code' })

            try {
                userRepository.signUp(mockCredentialsDto)
            } 
            catch(error) {
                expect(error).toBeInstanceOf(InternalServerErrorException)
            }
        })
    })

    describe('validateUserPassword', () => {
        
        let user;

        beforeEach(() => {

            userRepository.findOne = jest.fn()

            user = new User()
            user.username = 'Test user'
            user.validatePassword = jest.fn()
        })

        it('returns the usename as validation is successful', async () => {
            
            userRepository.findOne.mockResolvedValue(user)
            user.validatePassword.mockResolvedValue(true)

            const result = await userRepository.validateUserPassword(mockCredentialsDto)
            expect(result).toEqual(user.username)
        })

        it('returns null id user can not be found', async () => {
            
            userRepository.findOne.mockResolvedValue(null)
            
            const result = await userRepository.validateUserPassword(mockCredentialsDto)
            expect(user.validatePassword).not.toHaveBeenCalled()
            expect(result).toBeNull()
        })


        it('returns null if password is not valid', async () => {
            userRepository.findOne.mockResolvedValue(user)
            user.validatePassword.mockResolvedValue(false)
            
            const result = await userRepository.validateUserPassword(mockCredentialsDto)
            expect(user.validatePassword).toHaveBeenCalled()
            expect(result).toBeNull()
        })
    })

    describe('hashPassword', () => {

        it('calls bcrypt.hash to generate a hash', async () => {
            bcrypt.hash = jest.fn().mockResolvedValue('testHash')
            expect(bcrypt.hash).not.toHaveBeenCalled()
            const result = await userRepository.hashPassword('testPassword', 'testSalt')
            expect(bcrypt.hash).toHaveBeenCalledWith('testPassword', 'testSalt')
            expect(result).toEqual('testHash')
        })
    })
})