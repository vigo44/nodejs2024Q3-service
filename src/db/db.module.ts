import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { UserDbService } from './users-db.service';
import { ArtistDbService } from './artist-db.service';
import { AlbumDbService } from './album-db.service';
import { TrackDbService } from './track-db.service';
import { FavoriteDbService } from './favorite-db.service';

@Module({
  providers: [
    DbService,
    UserDbService,
    ArtistDbService,
    AlbumDbService,
    TrackDbService,
    FavoriteDbService,
  ],
  exports: [DbService],
})
export class DbModule {}
