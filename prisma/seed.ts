import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient({
  adapter: new PrismaPg(new Pool({ connectionString: process.env.DATABASE_URL })),
});

const photos = [
  {
    title: 'Home Studio',
    subtitle: 'Espacio de creación',
    description:
      'Un estudio casero con guitarras acústicas, una eléctrica, un bajo y un controlador MIDI. Muchos artistas independientes graban sus primeras maquetas en espacios así, con poca inversión y mucha luz natural.',
    imageUrl: '/media/images/photo-1.jpg',
  },
  {
    title: 'Noche de DJ',
    subtitle: 'Música electrónica',
    description:
      'Controladora de DJ iluminada en tonos neón. El DJ mezcla dos pistas sincronizando su tempo (BPM) y usa los faders para pasar de una canción a otra sin cortes.',
    imageUrl: '/media/images/photo-2.jpg',
  },
  {
    title: 'En el escenario',
    subtitle: 'Concierto en vivo',
    description:
      'Un vocalista levanta la mano entre humo y luces durante su show. La puesta en escena (iluminación, efectos y energía del artista) es parte fundamental de la experiencia en vivo.',
    imageUrl: '/media/images/photo-3.jpg',
  },
  {
    title: 'Sala de ensayo',
    subtitle: 'Batería, piano y micrófono',
    description:
      'Sala con muros de ladrillo, una batería, un piano electrónico y un micrófono de condensador. Las salas de ensayo permiten a las bandas preparar su repertorio antes de grabar o salir de gira.',
    imageUrl: '/media/images/photo-4.jpg',
  },
  {
    title: 'El público',
    subtitle: 'Festival de música',
    description:
      'Asistentes celebrando en primera fila de un festival. Los festivales reúnen a miles de personas y a varios artistas en una misma jornada.',
    imageUrl: '/media/images/photo-5.jpg',
  },
  {
    title: 'Luces de arena',
    subtitle: 'Gira en estadio',
    description:
      'Haces de luz sobre un público con las manos en alto en un recinto cerrado. Los shows en arenas requieren equipos de sonido e iluminación de gran escala.',
    imageUrl: '/media/images/photo-6.jpg',
  },
  {
    title: 'Partitura',
    subtitle: 'Música clásica',
    description:
      'Partitura de piano con anotaciones a lápiz del intérprete. La notación musical permite escribir altura, duración e intensidad de cada nota.',
    imageUrl: '/media/images/photo-7.jpg',
  },
  {
    title: 'Manos arriba',
    subtitle: 'Concierto masivo',
    description:
      'Siluetas del público frente a un escenario iluminado en tonos dorados. Un momento típico al inicio del tema más esperado de la noche.',
    imageUrl: '/media/images/photo-8.jpg',
  },
];

const videos = [
  {
    title: 'Big Buck Bunny',
    description: 'Fragmento del cortometraje animado de Blender Foundation (CC BY 3.0) con banda sonora orquestal original.',
    videoUrl: '/media/video/big-buck-bunny.mp4',
  },
  {
    title: 'Sintel',
    description: 'Fragmento del cortometraje de Blender Foundation (CC BY 3.0), musicalizado por Jan Morgenstern.',
    videoUrl: '/media/video/sintel.mp4',
  },
  {
    title: 'Jellyfish',
    description: 'Clip ambiental de medusas, ideal para acompañar música relajante.',
    videoUrl: '/media/video/jellyfish.mp4',
  },
];

const songs = [1, 2, 3, 4, 5].map((n) => ({
  title: `SoundHelix Song ${n}`,
  artist: 'T. Schürger',
  album: 'SoundHelix Examples',
  audioUrl: `/media/audio/song-${n}.mp3`,
  coverUrl: `/media/images/photo-${n}.jpg`,
}));

async function main() {
  await prisma.photo.deleteMany();
  await prisma.photo.createMany({ data: photos.map((p, i) => ({ ...p, order: i })) });

  await prisma.video.deleteMany();
  await prisma.video.createMany({ data: videos.map((v, i) => ({ ...v, order: i })) });

  await prisma.song.deleteMany();
  await prisma.song.createMany({ data: songs.map((s, i) => ({ ...s, order: i })) });

  await prisma.user.upsert({
    where: { email: 'demo@soundflow.app' },
    update: {},
    create: {
      email: 'demo@soundflow.app',
      password: await bcrypt.hash('soundflow123', 10),
      name: 'Usuario Demo',
      headline: 'Estudiante de Ingeniería de Software',
      university: 'Politécnico Grancolombiano',
      studies:
        'Ingeniería de Software (en curso).\nCurso de Desarrollo de Aplicaciones Móviles.\nBachiller académico.',
      experience:
        'Desarrollo de aplicaciones web y móviles como proyectos académicos.\nManejo de React Native, NestJS y bases de datos PostgreSQL.',
    },
  });

  console.log(`Seed listo: ${photos.length} fotos, ${videos.length} videos, ${songs.length} canciones, usuario demo.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
