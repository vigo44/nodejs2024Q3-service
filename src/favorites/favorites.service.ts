import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService, private readonly db: DbService) {}
  async findAll() {
    const fav = {
      ...this.db.favoritesDbService.getAll(),
    };
    const albums = await Promise.all(
      fav.albums.map(async (id) => {
        return await this.prisma.album.findUnique({
          where: { id },
        });
      }),
    );
    const tracks = await Promise.all(
      fav.tracks.map(async (id) => {
        return await this.prisma.track.findUnique({
          where: { id },
        });
      }),
    );
    const artists = await Promise.all(
      fav.artists.map(async (id) => {
        return await this.prisma.artist.findUnique({
          where: { id },
        });
      }),
    );
    return { artists, albums, tracks };
  }

  async createTrack(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) throw new UnprocessableEntityException('Track does not exist');
    this.db.favoritesDbService.addTrack(id);
  }

  async createAlbum(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) throw new UnprocessableEntityException('Album does not exist');
    this.db.favoritesDbService.addAlbum(id);
  }

  async createArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
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
