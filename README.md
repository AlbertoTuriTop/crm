# CRM Hexagonal (Next.js + TypeScript)

CRM full-stack con arquitectura hexagonal:
- Next.js App Router + TypeScript
- Auth.js/NextAuth con Google OAuth y restricción por email (`aflogon@gmail.com`)
- Prisma + SQLite
- Bootstrap
- Tests: Jest + RTL + BDD (jest-cucumber)
- Calidad: ESLint + Prettier
- Pre-commit: Husky + lint-staged

## Setup
1. `cp .env.example .env`
2. Configura variables OAuth de Google.
3. `npm install`
4. `npx prisma migrate dev`
5. `npm run dev`

## Variables de entorno
Ver `.env.example`.
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `DATABASE_URL`

## Scripts
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run test`
- `npm run test:watch`
- `npm run test:ci`
- `npm run lint`
- `npm run format`
- `npm run typecheck`

## Google OAuth
Crea credenciales OAuth Web App en Google Cloud y añade callback:
`http://localhost:3000/api/auth/callback/google`

## Hooks pre-commit
Se ejecutan automáticamente:
- `npm run lint`
- `npm run test`
- `npm run typecheck`
