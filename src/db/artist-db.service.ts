import { Injectable } from '@nestjs/common';
import { ArtistDbDto } from './dto/artist-db.dto';

@Injectable()
export class ArtistDbService {
  private artists: ArtistDbDto[] = [];

  getAll(): ArtistDbDto[] {
    return this.artists;
  }

  getById(id: string): ArtistDbDto | null {
    return this.artists.find((item) => item.id === id) ?? null;
  }

  create(artist: ArtistDbDto): ArtistDbDto {
    this.artists.push(artist);
    return artist;
  }

  update(id: string, artistUpdate: ArtistDbDto): ArtistDbDto | null {
    const artistIndex = this.artists.findIndex((item) => item.id === id);
    if (!~artistIndex) return null;

    this.artists[artistIndex] = artistUpdate;
    return this.artists[artistIndex];
  }

  delete(id: string) {
    const artistIndex = this.artists.findIndex((item) => item.id === id);
    if (!~artistIndex) return null;
    this.artists.splice(artistIndex, 1);
  }
}
