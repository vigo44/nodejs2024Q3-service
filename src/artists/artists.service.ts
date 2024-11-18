import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { Artist } from './entities/artist.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService, private readonly db: DbService) {}

  async create(artistDto: ArtistDto): Promise<Artist> {
    const artist = await this.prisma.artist.create({
      data: { ...artistDto },
    });
    return artist;
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async update(id: string, updateArtistDto: ArtistDto): Promise<Artist> {
    await this.findOne(id);
    const updateArtist = await this.prisma.artist.update({
      where: { id },
      data: { ...updateArtistDto },
    });

    return updateArtist;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.artist.delete({
      where: { id },
    });
    await this.prisma.album.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    await this.prisma.track.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });
    this.db.favoritesDbService.deleteArtist(id);
  }
}
