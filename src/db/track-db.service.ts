import { Injectable } from '@nestjs/common';
import { TrackDbDto } from './dto/track-db.dto';

@Injectable()
export class TrackDbService {
  private tracks: TrackDbDto[] = [];

  getAll(): TrackDbDto[] {
    return this.tracks;
  }

  getById(id: string): TrackDbDto | null {
    return this.tracks.find((item) => item.id === id) ?? null;
  }

  create(track: TrackDbDto): TrackDbDto {
    this.tracks.push(track);
    return track;
  }

  update(id: string, updateTrack: TrackDbDto): TrackDbDto | null {
    const trackIndex = this.tracks.findIndex((item) => item.id === id);
    if (!~trackIndex) return null;
    this.tracks[trackIndex] = updateTrack;
    return this.tracks[trackIndex];
  }

  delete(id: string) {
    const trackIndex = this.tracks.findIndex((item) => item.id === id);
    if (!~trackIndex) return null;
    this.tracks.splice(trackIndex, 1);
  }

  deleteArtistId(id: string) {
    this.tracks.map((item) => {
      if (item.artistId === id) {
        item.artistId = null;
      }
    });
  }

  deleteAlbumId(id: string) {
    this.tracks.map((item) => {
      if (item.albumId === id) {
        item.albumId = null;
      }
    });
  }
}
