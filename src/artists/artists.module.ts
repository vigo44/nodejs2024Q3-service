import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DbModule } from 'src/db/db.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [DbModule, PrismaModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
