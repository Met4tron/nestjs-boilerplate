import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { HashService } from './providers/hash.service';
import { SigninDto, SignupDto } from './dto';
import { JwtPayload, Tokens } from './types/jwt';
import { jwtConfig } from '../../config/environment';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignupDto) {
    const userExists = await this.userService.findByEmail(signUpDto.email);

    if (userExists) {
      throw new BadRequestException('User and/or password invalid');
    }

    const hashPassword = await this.hashService.hash(signUpDto.password);

    const newUser = await this.userService.create({
      ...signUpDto,
      password: hashPassword,
      refreshToken: null,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);

    await this.updateRefreshToken(newUser.id, newUser.email);

    return tokens;
  }

  async signIn(signInDto: SigninDto) {
    const { id, email } = await this.validateUser(
      signInDto.email,
      signInDto.password,
    );

    const tokens = await this.getTokens(id, email);

    await this.updateRefreshToken(id, tokens.refreshToken);

    return tokens;
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await this.hashService.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
    this.userService.update(userId, { refreshToken: null });
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashService.hash(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  private async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtConfig.accessOptions.secret,
        expiresIn: jwtConfig.accessOptions.expiresIn,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtConfig.refreshOptions.secret,
        expiresIn: jwtConfig.refreshOptions.expiresIn,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatch = await this.hashService.verify(
      user.password,
      password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
