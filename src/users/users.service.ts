import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { User } from './entities/user.entity';
import { createReadStream } from 'fs';

const es = require('event-stream');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    // user.password = createUserDto.password;
    user.role = 'user';
    return await user.save();
  }

  async findAll() {
    let results = 0;

    function getSHA() {
      return new Promise((resolve, reject) => {
        createReadStream('/Users/jackzro/Downloads/NXTELE.csv')
          .pipe(es.split())
          .pipe(
            es.mapSync((line) => {
              const durationCall = Number(line.split('|')[0].split(',')[13]);
              if (!isNaN(durationCall)) {
                // console.log(durationCall);
                results += durationCall;
                // console.log('res', results);
              }
            }),
          )
          .on('error', function (err) {
            console.error(err);
          })
          .on('end', () => {
            console.log(results);
            console.log('CSV file successfully processed');
            resolve(results);
          });
      });
    }

    const data = getSHA();

    return data;
  }

  async findOne(userLogin) {
    const user = await this.userRepository.findOne({ email: userLogin.email });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
