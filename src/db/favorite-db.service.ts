import { Injectable } from '@nestjs/common';
import { FavoritesDbDto } from './dto/favorites-db.dto';

@Injectable()
export class FavoriteDbService {
  private artists = new Set<string>();
  private albums = new Set<string>();
  private tracks = new Set<string>();

  getAll(): FavoritesDbDto {
    return {
      artists: [...this.artists],
      albums: [...this.albums],
      tracks: [...this.tracks],
    };
  }

  hasArtist(id: string): boolean {
    return this.artists.has(id);
  }

  hasAlbum(id: string): boolean {
    return this.albums.has(id);
  }

  hasTrack(id: string): boolean {
    return this.tracks.has(id);
  }

  addArtist(id: string): boolean {
    if (this.hasArtist(id)) return false;
    this.artists.add(id);
    return true;
  }

  addAlbum(id: string): boolean {
    if (this.hasAlbum(id)) return false;
    this.albums.add(id);
    return true;
  }

  addTrack(id: string): boolean {
    if (this.hasTrack(id)) return false;
    this.tracks.add(id);
    return true;
  }

  deleteArtist(id: string): boolean {
    return this.artists.delete(id);
  }

  deleteAlbum(id: string): boolean {
    return this.albums.delete(id);
  }

  deleteTrack(id: string): boolean {
    return this.tracks.delete(id);
  }
}
