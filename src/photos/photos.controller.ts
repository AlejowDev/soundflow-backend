import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PhotosService } from './photos.service';

@Controller('photos')
@UseGuards(JwtAuthGuard)
export class PhotosController {
  constructor(private readonly photos: PhotosService) {}

  @Get()
  findAll() {
    return this.photos.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photos.findOne(id);
  }
}
