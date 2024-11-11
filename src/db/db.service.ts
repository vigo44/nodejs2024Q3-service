import { Injectable } from '@nestjs/common';
import { UserDbService } from './users-db.service';
import { ArtistDbService } from './artist-db.service';

@Injectable()
export class DbService {
  constructor(
    public readonly usersDbService: UserDbService,
    public readonly artistsDbService: ArtistDbService,
  ) {}
}
