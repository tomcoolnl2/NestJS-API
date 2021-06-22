
import * as config from 'config'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserRepository } from './user.repository'
import { JwtStrategy } from './jwt.strategy'


const { secret, expiresIn } = config.get('jwt')
const { JWT_SECRET } = process.env // will be valid on production

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: JWT_SECRET ?? secret,
      signOptions: {
        expiresIn
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
