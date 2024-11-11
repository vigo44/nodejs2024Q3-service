import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuid } from 'uuid';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly db: DbService) {}
  create(artistDto: ArtistDto): Artist {
    const newArtist = {
      id: uuid(),
      ...artistDto,
    };
    return this.db.artistsDbService.create(newArtist);
  }

  findAll(): Artist[] {
    return this.db.artistsDbService.getAll();
  }

  findOne(id: string): Artist {
    const artist = this.db.artistsDbService.getById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  update(id: string, updateArtistDto: ArtistDto): Artist {
    this.findOne(id);
    return this.db.artistsDbService.update(id, {
      id,
      ...updateArtistDto,
    });
  }

  remove(id: string) {
    this.findOne(id);
    this.db.artistsDbService.delete(id);
    this.db.albumsDbService.deleteArtistId(id);
    this.db.tracksDbService.deleteArtistId(id);
    this.db.favoritesDbService.deleteArtist(id);
  }
}
