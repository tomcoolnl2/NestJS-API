
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { JwtPayload } from './jwt-payload.interface'
import { UserRepository } from './user.repository'


@Injectable()
export class AuthService {
    
    private logger = new Logger(AuthService.name)

    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}

    public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto)
    }

    public async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        
        const username = await this.userRepository.validateUserPassword(authCredentialsDto)
        
        if (!username) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload: JwtPayload = { username } // TODO: Add roles etc
        const accessToken = await this.jwtService.sign(payload)
        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`)

        return { accessToken }
    }
}
