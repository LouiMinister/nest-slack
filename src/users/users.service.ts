import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}
  async postUsers(email: string, nickname: string, password: string) {
    console.log('email', email);
    if (!email) {
      // throw new HttpException('이메일이 없습니다.', 400);
      throw new BadRequestException('이메일이 없습니다.');
    }
    if (!nickname) {
      // throw new HttpException('닉네임이 없습니다.', 400);
      throw new BadRequestException('닉네임이 없습니다.');
    }
    if (!password) {
      // throw new HttpException('비밀번호가 없습니다.', 400);
      throw new BadRequestException('비밀번호가 없습니다.');
    }
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다.');
      //throw new HttpException('이미 존재하는 사용자입니다', 401);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.userRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
