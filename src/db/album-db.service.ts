import { Injectable } from '@nestjs/common';
import { AlbumDbDto } from './dto/album-db.dto';

@Injectable()
export class AlbumDbService {
  private albums: AlbumDbDto[] = [];

  getAll(): AlbumDbDto[] {
    return this.albums;
  }

  getById(id: string): AlbumDbDto | null {
    return this.albums.find((item) => item.id === id) ?? null;
  }

  create(album: AlbumDbDto): AlbumDbDto {
    this.albums.push(album);
    return album;
  }

  update(id: string, updateAlbum: AlbumDbDto): AlbumDbDto | null {
    const albumIndex = this.albums.findIndex((item) => item.id === id);
    if (!~albumIndex) return null;
    this.albums[albumIndex] = updateAlbum;
    return this.albums[albumIndex];
  }

  delete(id: string) {
    const albumIndex = this.albums.findIndex((item) => item.id === id);
    if (!~albumIndex) return null;
    this.albums.splice(albumIndex, 1);
  }

  deleteArtistId(id: string) {
    this.albums.map((item) => {
      if (item.artistId === id) {
        item.artistId = null;
      }
    });
  }
}
