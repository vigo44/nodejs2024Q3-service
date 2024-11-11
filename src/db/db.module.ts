import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { UserDbService } from './users-db.service';

@Module({
  providers: [DbService, UserDbService],
  exports: [DbService],
})
export class DbModule {}
