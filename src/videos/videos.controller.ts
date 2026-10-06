import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VideosService } from './videos.service';

@Controller('videos')
@UseGuards(JwtAuthGuard)
export class VideosController {
  constructor(private readonly videos: VideosService) {}

  @Get()
  findAll() {
    return this.videos.findAll();
  }
}
