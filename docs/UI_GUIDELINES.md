# UI Design Guidelines

This document outlines the UI design standards and patterns to be followed across the application.

## 🎨 Design Principles

1. **Consistency**: Use the same patterns and components throughout the app
2. **Clarity**: Make UI elements clear and intuitive
3. **Accessibility**: Ensure all components are accessible
4. **Responsiveness**: Design mobile-first, works on all devices
5. **Performance**: Keep the UI fast and responsive

## 📏 Spacing System

### Standard Spacing Scale
- `gap-2` (8px) - Tight spacing for related items
- `gap-3` (12px) - Default spacing for inline elements
- `gap-4` (16px) - Standard spacing for form fields
- `gap-6` (24px) - Section spacing
- `gap-8` (32px) - Page section spacing

### Component Spacing
```tsx
// Cards
<Card>
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>
// Note: CardHeader and CardContent have built-in p-6 padding

// Forms
<form className="space-y-4">
  <FormField />
  <FormField />
</form>

// Page Layout
<PageLayout>
  <PageHeader title="Title" subtitle="Description" />
  <PageContent spacing="comfortable">
    {/* Content with gap-6 between children */}
  </PageContent>
</PageLayout>
```

## 🎨 Color Usage

### Semantic Colors Only
- **Never use hardcoded colors**: ~~`text-gray-500`~~ → `text-muted-foreground`
- **Background**: `bg-background`, `bg-card`, `bg-popover`
- **Foreground**: `text-foreground`, `text-muted-foreground`
- **Interactive**: `text-primary`, `bg-primary`, `hover:bg-primary/90`
- **Status**: `text-destructive`, `text-success`, `text-warning`

### Background Consistency
- **MainLayout provides the base background**: All pages rendered within MainLayout automatically have `bg-muted/20`
- **Never add page-level backgrounds**: Pages should NOT add their own background colors
- **Cards and containers**: Use `bg-card` for white/dark backgrounds, not `bg-white`
- **Sections needing different backgrounds**: Use cards or semantic backgrounds like `bg-muted`

### Common Replacements
- ~~`bg-gray-50`~~ → `bg-muted/30`
- ~~`bg-gray-100`~~ → `bg-muted/50`
- ~~`bg-white`~~ → `bg-card`
- ~~`bg-[#E5E5E5]`~~ → Remove (use MainLayout background)
- ~~`text-gray-400`~~ → `text-muted-foreground`
- ~~`text-gray-600`~~ → `text-foreground`
- ~~`hover:bg-gray-100`~~ → `hover:bg-muted/50`

## 📝 Typography

### Use Typography Components
```tsx
// Instead of
<h2 className="text-2xl font-bold">Title</h2>
<p className="text-sm text-gray-500">Description</p>

// Use
<Heading variant="heading-lg">Title</Heading>
<Text variant="body-sm" color="muted">Description</Text>
```

### Typography Scale
- **Page Title**: `heading-xl` (h1)
- **Section Title**: `heading-lg` (h2)
- **Card Title**: `heading-md` (h3)
- **Subsection**: `heading-sm` (h4)
- **Body Text**: `body-md` (default)
- **Small Text**: `body-sm`
- **Caption**: `caption` variant
- **Labels**: `label` variant

## 📄 Creating New Pages

### Page Structure Template
```tsx
// ✅ CORRECT: No background color on the page wrapper
const NewPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <PageHeader title="Page Title" subtitle="Optional description" />
      
      {/* If you need a card background */}
      <Card>
        <CardContent>
          {/* Your content */}
        </CardContent>
      </Card>
      
      {/* Or direct content without additional background */}
      <div className="space-y-4">
        {/* Your content */}
      </div>
    </div>
  );
};

// ❌ WRONG: Adding page-level background
const WrongPage = () => {
  return (
    <div className="bg-gray-100 p-4"> {/* Don't do this! */}
      {/* Content */}
    </div>
  );
};
```

### Page Layout Rules
1. **No background colors on page wrappers** - MainLayout provides `bg-muted/20`
2. **Use semantic containers** - Card, DataCard, or direct content
3. **Consistent padding** - Usually `p-4` or `p-6` for page-level padding
4. **Responsive width handling** - Account for sidebar state if needed

## 🧩 Component Patterns

### Buttons
```tsx
// Primary action
<Button>Save Changes</Button>

// Secondary action
<Button variant="outline">Cancel</Button>

// Destructive action
<Button variant="destructive">Delete</Button>

// Loading state
<Button loading loadingText="Saving...">Save</Button>
```

### Forms
```tsx
<FormSection title="Section Title" description="Help text">
  <FormRow columns={2}>
    <FormInput name="firstName" label="First Name" />
    <FormInput name="lastName" label="Last Name" />
  </FormRow>
  <FormRow>
    <FormTextarea name="bio" label="Bio" />
  </FormRow>
</FormSection>
```

### Cards
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content with automatic spacing */}
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Tables
```tsx
// Consistent table cell padding
<TableCell className="px-4 py-3">
  <Text variant="body-sm">{content}</Text>
</TableCell>

// Table headers
<TableHead className="px-4 py-3 text-xs font-medium uppercase tracking-wider">
  Column Name
</TableHead>
```

## 📱 Responsive Design

### Breakpoints
- Mobile: Default (< 640px)
- Tablet: `sm:` (≥ 640px)
- Desktop: `lg:` (≥ 1024px)
- Wide: `xl:` (≥ 1280px)

### Responsive Patterns
```tsx
// Hide on mobile, show on desktop
<span className="hidden lg:inline">Desktop Text</span>
<span className="lg:hidden">Mobile</span>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>

// Responsive spacing
<div className="p-4 lg:p-6">
  {/* Content */}
</div>
```

## ✅ Checklist

Before committing UI changes:
- [ ] No hardcoded colors (gray, blue, red, etc.)
- [ ] Using semantic color variables
- [ ] No page-level backgrounds (MainLayout provides bg-muted/20)
- [ ] Using `bg-card` instead of `bg-white` for containers
- [ ] Consistent spacing (no arbitrary values)
- [ ] Using Typography components for text
- [ ] Responsive on all screen sizes
- [ ] Accessible (ARIA labels, keyboard navigation)
- [ ] Following component patterns
- [ ] No inline styles

## 🚫 Don'ts

1. **Don't use arbitrary values**: ~~`p-[17px]`~~ → Use spacing scale
2. **Don't mix spacing**: Keep consistent within components
3. **Don't use color literals**: ~~`#333333`~~ → Use theme colors
4. **Don't ignore responsive**: Test on mobile
5. **Don't skip accessibility**: Add ARIA labels

## 🔄 Migration Guide

When updating existing components:
1. Replace hardcoded colors with semantic ones
2. Update spacing to use standard scale
3. Replace text classes with Typography components
4. Ensure consistent padding in cards (p-6)
5. Test responsive behavior
6. Add missing ARIA labels