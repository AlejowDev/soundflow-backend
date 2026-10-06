import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PhotosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.photo.findMany({ orderBy: { order: 'asc' } });
  }

  async findOne(id: string) {
    const photo = await this.prisma.photo.findUnique({ where: { id } });
    if (!photo) throw new NotFoundException('Imagen no encontrada');
    return photo;
  }
}
