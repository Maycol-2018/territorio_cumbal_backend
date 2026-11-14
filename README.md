# Territorio Indígena del Gran Cumbal — Backend

API REST en Node.js, TypeScript, Express, PostgreSQL y Prisma.

## Instalación

1. Copia `.env.example` como `.env` y configura PostgreSQL.
2. Instala dependencias: `npm install`.
3. Genera Prisma y ejecuta la migración: `npm run prisma:generate` y `npm run prisma:migrate -- --name init`.
4. Carga datos de prueba: `npm run prisma:seed`.
5. Inicia en desarrollo: `npm run dev`.

Usuario inicial: `juan123` / `Password123!`.

## Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (Bearer JWT)
- `POST /api/auth/logout` (Bearer JWT)
- `GET /api/corporacion` (Bearer JWT)
- `GET /health`

Las respuestas de error usan `{ "message": "...", "errors": { "campo": "..." } }` cuando hay errores de validación. Nunca se devuelve `passwordHash`.

El frontend debe definir `VITE_API_URL=http://localhost:3000`, guardar el token recibido y enviarlo como `Authorization: Bearer <token>`.
