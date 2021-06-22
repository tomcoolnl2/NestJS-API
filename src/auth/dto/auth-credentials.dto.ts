import { ApiProperty } from "@nestjs/swagger"
import { IsString, Matches, MaxLength, MinLength } from "class-validator"



export class AuthCredentialsDto {

    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, // TODO move to shared models
        { message: 'Password is too weak.' } // TODO l11n for response messages
    )
    password: string
}