import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class SigninDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(8, 32)
  @ApiProperty()
  password: string;
}
