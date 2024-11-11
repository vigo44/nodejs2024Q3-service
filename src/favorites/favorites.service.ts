import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DbService) {}
  findAll() {
    const fav = {
      ...this.db.favoritesDbService.getAll(),
    };
    const albums = fav.albums.map((item) => {
      return this.db.albumsDbService.getById(item);
    });
    const tracks = fav.tracks.map((item) => {
      return this.db.tracksDbService.getById(item);
    });
    const artists = fav.artists.map((item) => {
      return this.db.artistsDbService.getById(item);
    });
    return { artists, albums, tracks };
  }

  createTrack(id: string) {
    const track = this.db.tracksDbService.getById(id);
    if (!track) throw new UnprocessableEntityException('Track does not exist');
    this.db.favoritesDbService.addTrack(id);
  }

  createAlbum(id: string) {
    const album = this.db.albumsDbService.getById(id);
    if (!album) throw new UnprocessableEntityException('Album does not exist');
    this.db.favoritesDbService.addAlbum(id);
  }

  createArtist(id: string) {
    const artist = this.db.artistsDbService.getById(id);
    if (!artist)
      throw new UnprocessableEntityException('Artist does not exist');
    this.db.favoritesDbService.addArtist(id);
  }

  removeTrack(id: string) {
    const result = this.db.favoritesDbService.deleteTrack(id);
    if (!result) throw new NotFoundException('Track not found');
  }

  removeAlbum(id: string) {
    const result = this.db.favoritesDbService.deleteAlbum(id);
    if (!result) throw new NotFoundException('Album not found');
  }

  removeArtist(id: string) {
    const result = this.db.favoritesDbService.deleteArtist(id);
    if (!result) throw new NotFoundException('Artist not found');
  }
}
