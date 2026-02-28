# Before I Die

A quiet, intentional journal for your life's aspirations. No streaks. No pressure. Just a gentle place to capture the things you don't want to forget to live.

## Tech Stack

Unlike traditional monoliths, this project is decoupled into a robust modern stack:

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animation**: Framer Motion
- **State Management**: Zustand (Auth state) + TanStack Query (Server state)
- **HTTP Client**: Axios
- **Theming**: `next-themes` (Full Light/Dark mode support)

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: SQLite (Easily migratable to PostgreSQL)

## Features
- **Intentional Tracking**: Create bucket lists and manage life aspirations.
- **Reflections & Thoughts**: Instantly capture private notes and thoughts directly to your dashboard.
- **Memories Timeline**: View a chronological timeline of your completed life goals.
- **Dark Mode**: Beautiful, adaptive theming built on CSS currentColor filtering and semantic Tokens.

## Local Development

### Prerequisites
- Node.js v20+
- npm or pnpm

### Running the Backend

```bash
cd backend
npm install
# Generate Prisma Client & push schema
npx prisma generate
npx prisma db push
# Start the NestJS server on port 3001
npm run start:dev
```

### Running the Frontend

```bash
cd frontend
npm install
# Start the Next.js development server on port 3000
npm run dev
```

The application will be available at `http://localhost:3000`.

## Documentation
For detailed insights into the datastructues, API behavior, and flows (like how Auth and Thoughts work), please see [TECHNICAL.md](./TECHNICAL.md).
