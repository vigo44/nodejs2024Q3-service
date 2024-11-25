import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { DbService } from 'src/db/db.service';
import { Track } from './entities/track.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService, private readonly db: DbService) {}
  async create(trackDto: TrackDto): Promise<Track> {
    const newTrack = await this.prisma.track.create({
      data: { ...trackDto },
    });
    return newTrack;
  }

  async findAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async update(id: string, updateTrackDto: TrackDto): Promise<Track> {
    await this.findOne(id);
    const updateTrack = await this.prisma.track.update({
      where: { id },
      data: { ...updateTrackDto },
    });
    return updateTrack;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.track.delete({
      where: { id },
    });
    this.db.favoritesDbService.deleteTrack(id);
  }
}
