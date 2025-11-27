# BucketSync 🎯

> Create, manage, and share your bucket lists with friends

## Overview

BucketSync is a modern web application that helps you track your life goals and bucket list items. Whether it's travel adventures, learning goals, or personal achievements, BucketSync makes it easy to organize your dreams and track your progress.

## Features

### Core Functionality
- **Create Custom Lists**: Build unlimited bucket lists with custom names, emojis, and descriptions
- **Activity Management**: Add activities to your lists and track completion status
- **Progress Tracking**: Visual progress bars show how close you are to completing each list
- **Search & Filter**: Quickly find lists using search and filter by categories
- **Responsive Design**: Beautiful, mobile-friendly interface that works on any device

### Coming Soon
- **Social Sharing**: Share lists with friends and collaborate
- **Discovery**: Find inspiration from popular bucket list ideas
- **Friend Connections**: Follow friends and see their achievements
- **Notifications**: Get reminders and updates on your goals

## Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library

### State Management & Data Fetching
- **TanStack Query (React Query)** - Server state management
- **React Hooks** - Local state management

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Sonner** - Toast notifications

### Form Handling
- **React Hook Form** - Performant form management
- **Zod** - Schema validation

## Getting Started

### Prerequisites
- Node.js 18+ and npm (install via [nvm](https://github.com/nvm-sh/nvm))

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd bucketsync

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── Dashboard.tsx   # Main dashboard component
│   └── CreateListModal.tsx  # List creation modal
├── pages/              # Page components
│   ├── Index.tsx       # Home/dashboard page
│   ├── MyLists.tsx     # Lists management page
│   ├── ListDetail.tsx  # Individual list view
│   ├── Discovery.tsx   # Discover ideas page
│   ├── Friends.tsx     # Friends management page
│   └── Settings.tsx    # User settings page
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── App.tsx             # Root app component
└── index.css           # Global styles & design tokens
```

## Design System

The project uses a semantic token-based design system defined in `index.css` and `tailwind.config.ts`:

- **HSL Color Variables**: All colors use HSL format for consistency
- **Semantic Tokens**: `--background`, `--foreground`, `--primary`, etc.
- **Dark Mode Support**: Built-in light/dark mode theming
- **Component Variants**: Customized shadcn/ui components with project-specific styling

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint configuration included
- Component-based architecture
- Functional components with hooks
- Consistent file naming (PascalCase for components)

## Deployment

This project is built with [Lovable](https://lovable.dev) and can be easily deployed:

1. Open your [Lovable Project](https://lovable.dev/projects/0a25bc38-4447-4da4-b207-09480cf7d954)
2. Click **Share → Publish**
3. Your app will be live at a Lovable subdomain
4. Optional: Connect a custom domain in Project Settings

For self-hosting or other deployment options, see the [Lovable documentation](https://docs.lovable.dev/tips-tricks/self-hosting).

## Contributing

This project uses Lovable for development. To contribute:

1. Make changes via the [Lovable editor](https://lovable.dev/projects/0a25bc38-4447-4da4-b207-09480cf7d954)
2. Changes automatically sync to the GitHub repository
3. Or clone the repo and push changes directly to GitHub

## Roadmap

- [ ] User authentication & profiles
- [ ] Backend integration (database, storage)
- [ ] Social features (sharing, friends, comments)
- [ ] Public/private list visibility controls
- [ ] Mobile app (PWA support)
- [ ] Activity recommendations & suggestions
- [ ] Achievement badges & gamification
- [ ] Export/import functionality

## License

This project was created with [Lovable](https://lovable.dev).

## Support

For questions or issues:
- Visit [Lovable Documentation](https://docs.lovable.dev/)
- Join [Lovable Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)

---

Built with ❤️ using [Lovable](https://lovable.dev)
