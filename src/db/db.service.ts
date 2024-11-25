import { Injectable } from '@nestjs/common';
import { FavoriteDbService } from './favorite-db.service';

@Injectable()
export class DbService {
  constructor(public readonly favoritesDbService: FavoriteDbService) {}
}
