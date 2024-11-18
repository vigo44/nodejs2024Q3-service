import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { ArtistDbService } from './artist-db.service';
import { AlbumDbService } from './album-db.service';
import { TrackDbService } from './track-db.service';
import { FavoriteDbService } from './favorite-db.service';

@Module({
  providers: [
    DbService,
    ArtistDbService,
    AlbumDbService,
    TrackDbService,
    FavoriteDbService,
  ],
  exports: [DbService],
})
export class DbModule {}
