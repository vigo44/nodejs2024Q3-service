import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { DbService } from 'src/db/db.service';
import { Track } from './entities/track.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TracksService {
  constructor(private readonly db: DbService) {}
  create(trackDto: TrackDto): Track {
    const newTrack = {
      id: uuid(),
      ...trackDto,
    };
    return this.db.tracksDbService.create(newTrack);
  }

  findAll(): Track[] {
    return this.db.tracksDbService.getAll();
  }

  findOne(id: string): Track {
    const track = this.db.tracksDbService.getById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  update(id: string, updateTrackDto: TrackDto): Track {
    this.findOne(id);
    return this.db.tracksDbService.update(id, {
      id,
      ...updateTrackDto,
    });
  }

  remove(id: string) {
    this.findOne(id);
    this.db.tracksDbService.delete(id);
    this.db.favoritesDbService.deleteArtist(id);
  }
}
