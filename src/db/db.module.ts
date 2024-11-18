import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { FavoriteDbService } from './favorite-db.service';

@Module({
  providers: [DbService, FavoriteDbService],
  exports: [DbService],
})
export class DbModule {}
