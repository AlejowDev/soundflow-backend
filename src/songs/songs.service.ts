import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class SongsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(q?: string) {
    const term = q?.trim();
    return this.prisma.song.findMany({
      where: term
        ? {
            OR: [
              { title: { contains: term, mode: 'insensitive' } },
              { artist: { contains: term, mode: 'insensitive' } },
              { album: { contains: term, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { order: 'asc' },
    });
  }
}
