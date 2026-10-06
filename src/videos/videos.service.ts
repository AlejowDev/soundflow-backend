import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class VideosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.video.findMany({ orderBy: { order: 'asc' } });
  }
}
