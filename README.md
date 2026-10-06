# SoundFlow — Backend

API REST de SoundFlow hecha con **NestJS 11 + Prisma 7 + PostgreSQL**. Sirve el perfil del usuario, la galería, los videos y las canciones, además de los archivos multimedia (`/media/*`).

## Requisitos

- Node 20+ y pnpm
- PostgreSQL

## Puesta en marcha

```bash
pnpm install
cp .env.example .env          # completar DATABASE_URL y JWT_SECRET
./scripts/create-db.sh        # (opcional) crea usuario y BD en el Postgres local con sudo
pnpm prisma:push              # crea las tablas
pnpm seed                     # carga fotos, videos, canciones y el usuario demo
pnpm start:dev                # http://localhost:5006/api
```

Usuario demo: `demo@soundflow.app` / `soundflow123`

## Endpoints

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/api/auth/register` | — | Crea una cuenta `{ name, email, password }` y devuelve `{ token, user }` |
| POST | `/api/auth/login` | — | `{ email, password }` → `{ token, user }` |
| GET | `/api/users/me` | JWT | Perfil del usuario |
| PATCH | `/api/users/me` | JWT | Actualiza `name, headline, university, studies, experience` |
| GET | `/api/photos` | JWT | Galería musical |
| GET | `/api/photos/:id` | JWT | Detalle de una imagen |
| GET | `/api/videos` | JWT | Videos |
| GET | `/api/songs?q=` | JWT | Canciones (búsqueda opcional por título, artista o álbum) |
| GET | `/media/...` | — | Imágenes, audio y video estáticos (`public/media`) |

## Estructura

```
src/
├── auth/        registro, login, estrategia y guard JWT
├── users/       perfil (GET/PATCH /users/me)
├── photos/      galería
├── videos/      videos
├── songs/       canciones + búsqueda
├── database/    PrismaService (adapter pg)
├── common/      decorador @CurrentUser y filtro de errores
└── config/      configuración desde .env
prisma/
├── schema.prisma
└── seed.ts
public/media/    archivos multimedia
```

## Créditos del contenido

- Fotos: [Unsplash](https://unsplash.com) (Licencia Unsplash).
- Música: [SoundHelix](https://www.soundhelix.com), canciones de ejemplo de T. Schürger.
- Videos: *Big Buck Bunny* y *Sintel* © Blender Foundation (CC BY 3.0); clips de [test-videos.co.uk](https://test-videos.co.uk).
