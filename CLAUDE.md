# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
```bash
pnpm dev                 # Start development server on port 3000
pnpm dev:mock           # Start with MSW API mocks enabled
pnpm type-check         # Run TypeScript validation
pnpm type-check:watch   # Watch mode for TypeScript validation
```

### Testing
```bash
pnpm test               # Run unit tests (Vitest) in watch mode
pnpm test:run           # Run unit tests once
pnpm test:coverage      # Run tests with coverage report
pnpm test:e2e          # Run E2E tests (Playwright)
pnpm test:e2e:ui       # Run E2E tests with UI
```

### Code Quality
```bash
pnpm lint              # Run ESLint
pnpm lint:fix         # Auto-fix ESLint issues
pnpm format           # Run Prettier
pnpm format:check     # Check Prettier formatting
```

### Build & Deploy
```bash
pnpm build            # Production build
pnpm build:analyze    # Build with bundle analysis
pnpm preview          # Preview production build
```

### Code Generation
```bash
pnpm generate:component  # Generate new component
pnpm generate:hook      # Generate new hook
pnpm generate:page      # Generate new page
```

## Project Architecture

This is a **React 19 + TypeScript + Vite** enterprise commerce frontend application with the following key characteristics:

### Tech Stack
- **Framework**: React 19.1.0 with TypeScript 5.8.3
- **Build Tool**: Vite 6.3.5
- **Styling**: TailwindCSS 4.1.7 with CSS variables
- **State Management**: Zustand 5.0.5 (global) + TanStack Query 5.80.6 (server)
- **Routing**: React Router DOM 7.6.0
- **Forms**: React Hook Form 7.57.0 + Zod validation
- **UI Components**: Radix UI + shadcn/ui with CVA (Class Variance Authority)
- **Testing**: Vitest + Testing Library + Playwright
- **i18n**: i18next for English/Spanish support

### Project Structure
```
src/
├── app/                 # App configuration (providers, router)
├── components/          # Atomic design components
│   ├── atoms/          # Button, Input, Label
│   ├── molecules/      # Form components, SearchBox
│   ├── organisms/      # Header, Sidebar, Tables
│   ├── templates/      # Page layouts
│   └── ui/             # shadcn/ui components
├── features/           # Feature modules
│   ├── auth/           # Authentication
│   ├── customer/       # Customer management
│   ├── support/        # Support tickets
│   └── settings/       # Application settings
├── lib/                # External integrations
│   ├── api/            # Axios client with interceptors
│   ├── storage/        # localStorage utilities
│   └── monitoring/     # Sentry integration
├── stores/             # Zustand stores
├── hooks/              # Custom React hooks
└── types/              # Global TypeScript types
```

### Key Patterns

#### API Integration
- Axios client with automatic JWT token handling in `src/lib/api/client.ts`
- TanStack Query for server state management
- Zod schemas for request/response validation

#### Authentication
- JWT-based authentication with automatic token refresh
- Protected routes using `useAuth` hook
- Token storage in localStorage with persistence

#### Styling System
- TailwindCSS 4.1.7 with CSS variables for theming
- Dark/light mode support via CSS classes
- Component variants using CVA (Class Variance Authority)
- Semantic color tokens defined in `src/index.css`

#### State Management
- **Global UI State**: Zustand with persistence (sidebar, notifications)
- **Server State**: TanStack Query with caching and background updates
- **Form State**: React Hook Form with Zod validation
- **Theme State**: Context + localStorage

#### Component Development
- Atomic design methodology (atoms → molecules → organisms → templates)
- All components use forwardRef for proper ref handling
- CVA for consistent styling variants
- Storybook for component documentation

## Development Guidelines

### Path Aliases
Use these TypeScript path aliases:
- `@/*` → `src/*`
- `@app/*` → `src/app/*`
- `@components/*` → `src/components/*`
- `@features/*` → `src/features/*`
- `@lib/*` → `src/lib/*`
- `@hooks/*` → `src/hooks/*`
- `@stores/*` → `src/stores/*`
- `@types/*` → `src/types/*`

### Feature Development
Each feature module should contain:
- `components/` - Feature-specific components
- `hooks/` - Feature-specific hooks
- `stores/` - Feature-specific Zustand stores
- `api/` - API functions and types
- `types/` - TypeScript types and Zod schemas

### Testing Requirements
- Unit tests for all hooks and utilities
- Component tests for complex components
- E2E tests for critical user flows
- 80% code coverage requirement

### Code Quality
- ESLint 9 with strict TypeScript rules
- Prettier for code formatting
- Husky + lint-staged for pre-commit hooks
- Strict TypeScript configuration with `noUncheckedIndexedAccess`

## Key Files to Reference

### Configuration
- `vite.config.ts` - Build configuration with chunk splitting
- `tailwind.config.js` - Styling configuration
- `tsconfig.json` - TypeScript configuration with strict settings
- `vitest.config.ts` - Test configuration
- `playwright.config.ts` - E2E test configuration

### Core Application
- `src/app/providers/` - Application providers setup
- `src/app/router/` - Route definitions and protected routes
- `src/lib/api/client.ts` - API client with interceptors
- `src/stores/useAppStore.ts` - Global application state
- `src/components/templates/MainLayout/` - Main application layout

### Authentication
- `src/features/auth/hooks/useAuth.ts` - Authentication hook
- `src/features/auth/api/authApi.ts` - Authentication API functions
- `src/features/auth/stores/useAuthStore.ts` - Authentication state

This is a production-ready enterprise application with comprehensive testing, monitoring, and deployment configurations.