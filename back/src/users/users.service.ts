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
  
  async createUser(createUserDto: CreateUserDto): Promise<{ message: string; user: User }> {
    const { email, password, phone } = createUserDto;
    
    const newUser = this.userRepository.create({
      email,
      password, 
      phone,
    });
  
    const savedUser = await this.userRepository.save(newUser);
    
    return {
      message: "Usuario creado con éxito",
      user: savedUser, 
    };
  }
  
  async getAllUsers(page: number, limit:number){
    const skip = (page - 1) *limit;
    const users = await this.userRepository.find({
        take:limit,
        skip: skip,
    });

    return users.map(({ password, ...userNoPassword}) => userNoPassword);
}

}


