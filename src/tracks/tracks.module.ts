import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DbModule } from 'src/db/db.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [DbModule, PrismaModule],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
