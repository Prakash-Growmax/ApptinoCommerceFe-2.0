# 🚀 Enterprise React Boilerplate - Knowledge Transfer

## 📋 Overview & Architecture

### Tech Stack Summary
```
Frontend Framework: React 19.1.0 + TypeScript 5.8.3
Build Tool: Vite 6.3.5
Styling: TailwindCSS 4.1.7 + CSS Variables
State Management: Zustand 5.0.5 + TanStack Query 5.76.2
Routing: React Router DOM 7.6.0
Forms: React Hook Form 7.56.4 + Zod validation
Testing: Vitest 3.1.4 + Testing Library + Playwright
Linting: ESLint 9 + TypeScript ESLint + Prettier
Authentication: Custom JWT implementation
Internationalization: i18next 25.2.0
Monitoring: Sentry integration + Web Vitals
```

## 🏗️ Project Structure Deep Dive

### Root Level Configuration
```
├── package.json          # Dependencies & scripts
├── vite.config.ts        # Build configuration
├── tailwind.config.js    # Styling configuration  
├── tsconfig.json         # TypeScript base config
├── tsconfig.app.json     # App-specific TS config
├── vitest.config.ts      # Test configuration
├── playwright.config.ts  # E2E test configuration
├── eslint.config.js      # Linting rules
├── .prettierrc          # Code formatting
├── plopfile.js          # Code generation
└── .github/workflows/   # CI/CD pipeline
```

### Source Structure (`src/`)
```
src/
├── app/                 # App-level configuration
│   ├── providers/      # Context providers (Theme, Query, i18n)
│   └── router/         # Route definitions & protected routes
├── components/         # Reusable UI components (Atomic Design)
│   ├── atoms/         # Basic elements (Button, Input)
│   ├── molecules/     # Component combinations (FormField, Form)
│   ├── organisms/     # Complex sections (Header, Sidebar, ErrorFallback)
│   ├── templates/     # Page layouts (MainLayout)
│   └── ui/            # shadcn/ui components (Button with CVA)
├── features/          # Feature-based modules
│   ├── auth/         # Authentication feature
│   ├── dashboard/    # Dashboard feature
│   ├── home/         # Home page feature
│   └── error/        # Error handling feature
├── hooks/            # Custom React hooks
├── lib/              # Third-party integrations
│   ├── api/         # API client (Axios with interceptors)
│   ├── storage/     # localStorage utilities
│   ├── monitoring/  # Sentry & analytics
│   └── utils/       # General utilities + constants
├── stores/          # Zustand global stores
├── styles/          # Global CSS + theme variables
├── test/            # Testing utilities & mocks
├── types/           # Global TypeScript types
└── utils/           # Pure utility functions
```

## 🔧 Core Systems Breakdown

### 1. Build System (Vite Configuration)

**File: `vite.config.ts`**
```typescript
Key Features:
- React Fast Refresh with .tsx files
- TailwindCSS 4.1.7 integration
- TypeScript path mapping support
- Bundle analysis with visualizer
- Smart chunk splitting (react, router, query, ui, auth, dashboard)
- Environment variable injection (__APP_VERSION__)
- Development server on port 3000
```

**Bundle Strategy:**
- **Vendor chunks**: React, Router, Query, UI libraries
- **Feature chunks**: Auth, Dashboard (lazy loaded)
- **Chunk size warning**: 1000kb limit

### 2. Styling System (TailwindCSS 4 + CSS Variables)

**Configuration: `tailwind.config.js`**
```javascript
Key Features:
- CSS Variables for theming (@theme inline syntax)
- Custom color system with semantic naming
- Extended border radius scale
- Custom animations (fade-in, slide-in-from-top)
- Dark mode with 'class' strategy
```

**Theme System: `src/index.css`**
```css
Root Variables:
--radius: 0.625rem (10px)
--background, --foreground: Light/dark mode colors
--primary, --secondary, --accent: Brand colors
--destructive, --muted: Status colors
--card, --popover: Surface colors

Dark Mode:
.dark class toggles all color variables
CSS custom properties ensure consistent theming
```

### 3. TypeScript Configuration

**Base Config: `tsconfig.json`**
```json
Strict Settings:
- strict: true + all strict flags enabled
- noUncheckedIndexedAccess: Array safety
- exactOptionalPropertyTypes: Strict optionals
- verbatimModuleSyntax: false (for flexibility)

Path Mapping:
@/* → src/*
@app/* → src/app/*
@components/* → src/components/*
@features/* → src/features/*
[etc.]
```

### 4. State Management Architecture

#### Global State (Zustand)
**App Store: `src/stores/useAppStore.ts`**
```typescript
Features:
- Sidebar collapse state
- Notification system (success/error/warning/info)
- Persistence middleware for UI preferences
- DevTools integration
```

**Auth Store: `src/features/auth/stores/useAuthStore.ts`**
```typescript
Features:
- User state management
- Loading states
- Error handling
- Clear auth action
```

#### Server State (TanStack Query v5)
**Provider: `src/app/providers/query-provider.tsx`**
```typescript
Configuration:
- staleTime: 1 minute
- gcTime: 5 minutes (renamed from cacheTime in v5)
- retry: 1 attempt
- React Query DevTools in development
```

### 5. Authentication System

**API Layer: `src/features/auth/api/authApi.ts`**
```typescript
Features:
- login(), register(), getCurrentUser(), logout()
- Token storage in localStorage
- Automatic token attachment via axios interceptors
- Refresh token support
```

**Hook: `src/features/auth/hooks/useAuth.ts`**
```typescript
Returns:
- user: User | null
- isAuthenticated: boolean
- isLoading: boolean
- error: string | null
- login(credentials): Promise<boolean>
- logout(): Promise<void>
```

**Protected Routes: `src/app/router/protected-route.tsx`**
```typescript
Features:
- Authentication check
- Redirect to login with location state
- Loading state handling
```

### 6. Form Management

**Components:**
- `Form` (React Hook Form provider wrapper)
- `FormField` (Controller with validation)  
- `FormControl` (Label + error display)

**Validation: Zod schemas**
```typescript
// Example: src/features/auth/types/auth.types.ts
loginCredentialsSchema: email + password + optional rememberMe
registrationSchema: name + email + password + confirmPassword + acceptTerms
```

### 7. API Client (`src/lib/api/client.ts`)

**Features:**
```typescript
- Axios instance with base configuration
- Request interceptor: Auto-attach bearer tokens
- Response interceptor: Handle 401s, format errors
- Typed wrapper functions (apiGet, apiPost, apiPut, apiPatch, apiDelete)
- Zod schema validation integration
- Environment-based API URL configuration
```

**Error Handling:**
```typescript
interface ApiError {
  message: string;
  code?: string;
  status: number;
}
```

### 8. Routing System

**Router: `src/app/router/index.tsx`**
```typescript
Route Structure:
/ (MainLayout)
  ├── / (HomePage)
  └── /dashboard (ProtectedRoute → DashboardPage)
/auth
  ├── /login (LoginPage)
  ├── /register (RegisterPage)
  └── / (redirect to login)
* (NotFoundPage)

Lazy Loading: All page components are lazy loaded
Error Boundaries: Wrap each route level
```

### 9. Internationalization (i18n)

**Configuration: `src/config/i18n/index.ts`**
```typescript
Features:
- Language detection (localStorage → navigator)
- Fallback to English
- Translation resources in separate JSON files
- React integration via react-i18next
```

**Translation Files:**
- `src/config/i18n/locales/en/translation.json`
- `src/config/i18n/locales/es/translation.json`

**Namespaces:**
```json
{
  "app": { "title", "description" },
  "common": { "loading", "error", "save", "cancel"... },
  "auth": { "login", "logout", "email", "password"... },
  "navigation": { "home", "dashboard", "profile"... },
  "errors": { "general", "notFound", "unauthorized"... }
}
```

### 10. Component System (Atomic Design)

#### Atoms
**Button: `src/components/atoms/Button/Button.tsx`**
```typescript
Features:
- Class Variance Authority (CVA) for variants
- Variants: default, destructive, outline, secondary, ghost, link
- Sizes: default, sm, lg, icon
- Loading state with spinner
- Full width option
```

**Input: `src/components/atoms/Input/Input.tsx`**
```typescript
Features:
- Error state styling
- Forward ref support
- CVA integration
```

#### Molecules
**Form Components:**
- `Form`: React Hook Form provider wrapper
- `FormField`: Controller with render prop pattern
- `FormControl`: Label, error, description wrapper

#### Organisms
**Header: `src/components/organisms/Header/Header.tsx`**
```typescript
Features:
- Logo and navigation
- Theme toggle (dark/light mode)
- Authentication buttons
- Responsive design
```

**Sidebar: `src/components/organisms/Sidebar/Sidebar.tsx`**
```typescript
Features:
- Collapsible design
- Navigation items with icons
- Active state highlighting
- Responsive (hidden on mobile)
```

**Error Fallback: `src/components/organisms/ErrorFallback/ErrorFallback.tsx`**
```typescript
Features:
- Development stack trace
- Retry functionality
- Home navigation
- Responsive design
```

#### Templates
**MainLayout: `src/components/templates/MainLayout/MainLayout.tsx`**
```typescript
Structure:
- Header (sticky)
- Sidebar + Main content (flex)
- Footer
- Suspense wrapper with loading fallback
```

### 11. Testing Infrastructure

#### Unit/Integration Tests (Vitest)
**Configuration: `vitest.config.ts`**
```typescript
Features:
- jsdom environment
- Coverage with HTML reports
- 80% threshold requirements
- MSW integration for API mocking
```

**Test Utils: `src/test/utils/`**
```typescript
- Custom render with all providers
- Test providers (Router, Query, i18n)
- MSW handlers for API mocking
- Setup file with global mocks
```

#### E2E Tests (Playwright)
**Configuration: `playwright.config.ts`**
```typescript
Features:
- Multi-browser testing (Chrome, Firefox, Safari, Mobile)
- Visual regression testing
- Test isolation
- HTML reports with traces
```

### 12. Code Quality & DevOps

#### Linting (`eslint.config.js`)
```typescript
Rules:
- TypeScript strict rules
- React Hooks rules
- Accessibility rules (jsx-a11y)
- Import/export restrictions (no relative imports outside directory)
- Consistent type imports
```

#### Git Hooks (Husky + lint-staged)
```json
Pre-commit:
- ESLint --fix
- Prettier --write
- Package.json sorting
```

#### CI/CD Pipeline (`.github/workflows/ci.yml`)
```yaml
Jobs:
1. Quality: Type check, lint, format, security audit
2. Test: Unit tests with coverage
3. E2E: Playwright tests
4. Build: Bundle analysis, Lighthouse CI
5. Deploy: Production deployment (on main branch)
6. Notify: Slack notifications
```

### 13. Monitoring & Analytics

**Sentry Integration: `src/lib/monitoring/index.ts`**
```typescript
Features:
- Error tracking with context
- Performance monitoring
- Session replay
- Release tracking
- Custom error filtering
```

**Web Vitals:**
```typescript
Metrics:
- CLS (Cumulative Layout Shift)
- FCP (First Contentful Paint)
- FID (First Input Delay) → INP (Interaction to Next Paint)
- LCP (Largest Contentful Paint)
- TTFB (Time to First Byte)
```

### 14. Environment & Configuration

**Environment Variables:**
```typescript
VITE_API_URL: API endpoint
VITE_APP_VERSION: Version string
VITE_ENABLE_MOCKS: MSW toggle
VITE_SENTRY_DSN: Error tracking
```

**Configuration: `src/config/environment.ts`**
```typescript
Features:
- Zod validation for env vars
- Type-safe environment access
- Fallback values for development
- Environment detection utilities
```

## 🎯 Key Features Summary

### Authentication Flow
1. **Login**: JWT token → localStorage → axios interceptor
2. **Protected Routes**: useAuth hook → redirect logic
3. **Token Refresh**: Automatic via axios interceptors
4. **Logout**: Clear tokens → invalidate queries

### Theme System
1. **CSS Variables**: Semantic color tokens
2. **Dark Mode**: Class-based toggle
3. **TailwindCSS**: Utility-first styling
4. **Component Variants**: CVA for consistent styling

### State Management
1. **UI State**: Zustand with persistence
2. **Server State**: TanStack Query with caching
3. **Form State**: React Hook Form with Zod validation
4. **Theme State**: Context + localStorage

### Development Experience
1. **Hot Reload**: Vite + React Fast Refresh
2. **Type Safety**: Strict TypeScript + Zod validation
3. **Code Generation**: Plop for components/hooks/pages
4. **Testing**: Comprehensive test setup with MSW
5. **Code Quality**: ESLint + Prettier + Husky

### Production Ready
1. **Bundle Optimization**: Code splitting + tree shaking
2. **Performance**: Web Vitals monitoring
3. **Error Handling**: Sentry + Error boundaries
4. **Security**: CSP headers + dependency auditing
5. **CI/CD**: Comprehensive pipeline with quality gates

## 🚀 Getting Started Commands

```bash
# Development
pnpm dev                 # Start dev server
pnpm dev:mock           # Start with MSW mocks
pnpm type-check         # TypeScript validation

# Testing  
pnpm test               # Unit tests (watch mode)
pnpm test:coverage      # Coverage report
pnpm test:e2e          # Playwright E2E tests

# Code Quality
pnpm lint              # ESLint check
pnpm lint:fix         # Auto-fix linting issues
pnpm format           # Prettier formatting

# Build & Deploy
pnpm build            # Production build
pnpm preview          # Preview production build
pnpm build:analyze    # Bundle analysis

# Code Generation
pnpm generate:component  # Create new component
pnpm generate:hook      # Create new hook
pnpm generate:page      # Create new page
```

## 🔄 Common Workflows

### Adding a New Feature
1. `pnpm generate:feature feature-name`
2. Implement API layer with types
3. Create components with stories
4. Add routes and navigation
5. Write tests (unit + E2E)
6. Update documentation

### Adding a New Component
1. `pnpm generate:component ComponentName`
2. Choose atomic level (atoms/molecules/organisms)
3. Implement with CVA for variants
4. Add Storybook story
5. Write tests
6. Export from index files

### Theme Customization
1. Update CSS variables in `src/index.css`
2. Modify `tailwind.config.js` if needed
3. Test in both light/dark modes
4. Update Storybook backgrounds

This boilerplate provides a solid foundation for enterprise React applications with modern tooling, comprehensive testing, and production-ready configurations.
````
