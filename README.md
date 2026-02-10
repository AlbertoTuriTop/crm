# CRM Hexagonal (Next.js + TypeScript)

CRM full-stack con arquitectura hexagonal:
- Next.js App Router + TypeScript
- Auth.js/NextAuth integrado en código (actualmente desactivado en UI)
- Prisma + SQLite
- Bootstrap
- Tests: Jest + RTL + BDD (jest-cucumber)
- Calidad: ESLint + Prettier
- Pre-commit: Husky + lint-staged

## Setup
1. `cp .env.example .env`
2. Configura variables de entorno.
3. `npm install`
4. `npx prisma migrate dev`
5. `npm run dev`

## Variables de entorno
Ver `.env.example`.
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

## Login
Actualmente el acceso está habilitado sin autenticación para facilitar despliegues y pruebas.
La ruta `/login` ofrece acceso manual al CRM sin requerir OAuth.

## Hooks pre-commit
Se ejecutan automáticamente:
- `npm run lint`
- `npm run test`
- `npm run typecheck`


## Nota sobre Google OAuth
La configuración de NextAuth y Google se mantiene en el repositorio para reactivarla cuando se
necesite, pero no forma parte del flujo de inicio de sesión actual.
