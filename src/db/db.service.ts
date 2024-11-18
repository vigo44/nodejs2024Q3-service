import { Injectable } from '@nestjs/common';
import { ArtistDbService } from './artist-db.service';
import { TrackDbService } from './track-db.service';
import { AlbumDbService } from './album-db.service';
import { FavoriteDbService } from './favorite-db.service';

@Injectable()
export class DbService {
  constructor(
    public readonly artistsDbService: ArtistDbService,
    public readonly tracksDbService: TrackDbService,
    public readonly albumsDbService: AlbumDbService,
    public readonly favoritesDbService: FavoriteDbService,
  ) {}
}
