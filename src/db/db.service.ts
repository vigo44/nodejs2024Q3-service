import { Injectable } from '@nestjs/common';
import { UserDbService } from './users-db.service';
import { ArtistDbService } from './artist-db.service';
import { TrackDbService } from './track-db.service';
import { AlbumDbService } from './album-db.service';

@Injectable()
export class DbService {
  constructor(
    public readonly usersDbService: UserDbService,
    public readonly artistsDbService: ArtistDbService,
    public readonly tracksDbService: TrackDbService,
    public readonly albumssDbService: AlbumDbService,
  ) {}
}
