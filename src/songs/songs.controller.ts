import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SongsService } from './songs.service';

@Controller('songs')
@UseGuards(JwtAuthGuard)
export class SongsController {
  constructor(private readonly songs: SongsService) {}

  @Get()
  findAll(@Query('q') q?: string) {
    return this.songs.findAll(q);
  }
}
