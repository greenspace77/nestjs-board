import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  
  async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ username });

    if(user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    }
    else {
      throw new UnauthorizedException('login failed');
    }
   }
}