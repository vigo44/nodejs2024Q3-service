import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { DbService } from 'src/db/db.service';
import { Album } from './entities/album.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService, private readonly db: DbService) {}

  async create(createAlbumDto: AlbumDto): Promise<Album> {
    const newAlbum = await this.prisma.album.create({
      data: { ...createAlbumDto },
    });
    return newAlbum;
  }

  async findAll(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async update(id: string, updateAlbumDto: AlbumDto): Promise<Album> {
    await this.findOne(id);
    const updateArtist = await this.prisma.album.update({
      where: { id },
      data: { ...updateAlbumDto },
    });
    return updateArtist;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.album.delete({
      where: { id },
    });
    await this.prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });
    this.db.favoritesDbService.deleteAlbum(id);
  }
}
