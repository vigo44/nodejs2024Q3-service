import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { v4 as uuid } from 'uuid';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await hash(password, +process.env.CRYPT_SALT);
    return hashedPassword;
  }

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const hash = await this.hashPassword(password);
    const newUser = {
      id: uuid(),
      login,
      password: hash,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const user = await this.prisma.user.create({ data: newUser });
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const { oldPassword, newPassword } = updateUserDto;
    const isPasswordValid = await compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Incorrect old password"');
    }
    const hashedPassword = await this.hashPassword(newPassword);
    const updateUser = this.prisma.user.update({
      where: { id },
      data: {
        id: user.id,
        login: user.login,
        password: hashedPassword,
        version: user.version + 1,
        createdAt: user.createdAt,
        updatedAt: new Date(),
      },
    });
    return updateUser;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
