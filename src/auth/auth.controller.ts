
import { Body, Controller, Logger, Post, ValidationPipe } from '@nestjs/common'
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'


@ApiTags(AuthController.apiRoute)
@ApiInternalServerErrorResponse({ 
    description: 'Internal server error' 
})
@Controller(AuthController.apiRoute)
export class AuthController {

    public static readonly apiRoute = 'auth'

    private logger = new Logger(AuthController.name)

    constructor(
        private authService: AuthService
    ) {}

    @Post('/signup')
    @ApiOkResponse({ description: 'User signed up successfully'})
    public signUp(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
    ): Promise<void> {
        
        this.logger.verbose('User signed up successfully')
        return this.authService.signUp(authCredentialsDto)
    }

    @Post('/signin')
    @ApiOkResponse({ description: 'User signed in successfully'})
    public signIn(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
    ): Promise<{ accessToken: string }> {
        
        this.logger.verbose('User signed in successfully')
        return this.authService.signIn(authCredentialsDto)
    }
}