import { Injectable } from '@nestjs/common';
import { UserDbService } from './users-db.service';

@Injectable()
export class DbService {
  constructor(public readonly usersDbService: UserDbService) {}
}
