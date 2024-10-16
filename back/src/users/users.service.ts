import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto'; 
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  
  async createUser(createUserDto: CreateUserDto): Promise<string> {
    const { email, password, phone } = createUserDto;
    const newUser = this.userRepository.create({
        email,
        password, 
        phone,
      });
  
      
       this.userRepository.save(newUser);
       return "usuario creado"
    }
  
  findAll() {
    return `This action returns all users`;
  }


}