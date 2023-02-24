import { IsEmail, IsString, Length } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @Length(8, 32)
  password: string;
}
