import { Injectable } from '@nestjs/common';
import { UserDbDto } from './dto/user-db.dto';

@Injectable()
export class UserDbService {
  private users: UserDbDto[] = [];

  getAll(): UserDbDto[] {
    return this.users;
  }

  getById(id: string): UserDbDto | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(user: UserDbDto): UserDbDto {
    this.users.push(user);
    return user;
  }

  update(id: string, updatedUser: UserDbDto): UserDbDto | undefined {
    const userIndex = this.users.findIndex((item) => item.id === id);
    if (!userIndex) return null;

    this.users[userIndex] = updatedUser;
    return this.users[userIndex];
  }

  delete(id: string) {
    const userIndex = this.users.findIndex((item) => item.id === id);
    if (userIndex === -1) return null;
    this.users.splice(userIndex, 1);
  }
}
