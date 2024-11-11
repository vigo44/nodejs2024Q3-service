import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly database: DbService) {}
  create(createUserDto: CreateUserDto): UserEntity {
    const { login, password } = createUserDto;
    const newUser = new UserEntity({
      id: uuid(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return this.database.usersDbService.create(newUser);
  }

  findAll(): UserEntity[] {
    return this.database.usersDbService.getAll();
  }

  findOne(id: string): UserEntity {
    const user = this.database.usersDbService.getById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    const { oldPassword, newPassword } = updateUserDto;
    if (oldPassword !== user.password) {
      throw new ForbiddenException('Incorrect old password"');
    }
    const updateUser = this.database.usersDbService.update(
      id,
      new UserEntity({
        id: user.id,
        login: user.login,
        password: newPassword,
        version: user.version + 1,
        createdAt: user.createdAt,
        updatedAt: Date.now(),
      }),
    );

    return updateUser;
  }

  remove(id: string) {
    if (this.database.usersDbService.delete(id) === null) {
      throw new NotFoundException('User not found');
    }
  }
}
