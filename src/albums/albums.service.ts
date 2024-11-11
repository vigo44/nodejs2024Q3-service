import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { DbService } from 'src/db/db.service';
import { v4 as uuid } from 'uuid';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(private readonly db: DbService) {}

  create(createAlbumDto: AlbumDto): Album {
    const newAlbum = {
      id: uuid(),
      ...createAlbumDto,
    };
    return this.db.albumsDbService.create(newAlbum);
  }

  findAll(): Album[] {
    return this.db.albumsDbService.getAll();
  }

  findOne(id: string): Album {
    const album = this.db.albumsDbService.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  update(id: string, updateAlbumDto: AlbumDto): Album {
    this.findOne(id);
    return this.db.albumsDbService.update(id, {
      id,
      ...updateAlbumDto,
    });
  }

  remove(id: string) {
    this.findOne(id);
    this.db.albumsDbService.delete(id);
    this.db.tracksDbService.deleteAlbumId(id);
    this.db.favoritesDbService.deleteAlbum(id);
  }
}
