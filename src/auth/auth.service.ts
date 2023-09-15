import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userLogin): Promise<any> {
    const user = await this.usersService.findOne(userLogin);
    if (user && (await bcrypt.compare(userLogin.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return {
      message: 'Incorrect Email or Password',
    };
  }

  async login(userLogin) {
    const userFromDB = await this.usersService.findOne(userLogin);
    const payload = { name: userFromDB.name, sub: userFromDB.id };
    const jwt = await this.jwtService.signAsync(payload);
    return {
      access_token: jwt,
    };
  }
}
