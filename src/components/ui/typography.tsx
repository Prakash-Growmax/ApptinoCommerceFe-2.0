// src/components/ui/typography.tsx
import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Typography variants using our design system
const typographyVariants = cva(
  'transition-theme', // Base class for theme transitions
  {
    variants: {
      variant: {
        // Display text (for big headings, hero sections)
        'display-2xl': 'text-display-2xl font-display text-foreground',
        'display-xl': 'text-display-xl font-display text-foreground',
        'display-lg': 'text-display-lg font-display text-foreground',
        'display-md': 'text-display-md font-display text-foreground',
        'display-sm': 'text-display-sm font-display text-foreground',
        'display-xs': 'text-display-xs font-display text-foreground',

        // Headings (for section headers, card titles, etc.)
        'heading-xl': 'text-body-xl font-semibold text-foreground',
        'heading-lg': 'text-body-lg font-semibold text-foreground',
        'heading-md': 'text-body-md font-semibold text-foreground',
        'heading-sm': 'text-body-sm font-semibold text-foreground',
        'heading-xs': 'text-body-xs font-semibold text-foreground',

        // Body text (for main content)
        'body-xl': 'text-body-xl font-regular text-foreground',
        'body-lg': 'text-body-lg font-regular text-foreground',
        'body-md': 'text-body-md font-regular text-foreground',
        'body-sm': 'text-body-sm font-regular text-foreground',
        'body-xs': 'text-body-xs font-regular text-foreground',

        // Special variants
        label: 'text-body-sm font-medium text-foreground',
        caption: 'text-body-xs font-regular text-muted-foreground',
        overline:
          'text-body-xs font-medium text-muted-foreground uppercase tracking-wider',
        code: 'text-body-sm font-mono text-foreground bg-muted px-1 py-0.5 rounded-md',

        // Semantic variants
        muted: 'text-body-sm font-regular text-muted-foreground',
        small: 'text-body-xs font-regular text-foreground',
        large: 'text-body-lg font-regular text-foreground',
        lead: 'text-body-xl font-regular text-muted-foreground',
      },
      weight: {
        light: 'font-light',
        regular: 'font-regular',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      color: {
        default: '',
        muted: 'text-muted-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary',
        destructive: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
        info: 'text-info',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
    },
    defaultVariants: {
      variant: 'body-md',
      color: 'default',
      align: 'left',
    },
  }
);

interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  as?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    { className, variant, weight, color, align, asChild = false, as, ...props },
    ref
  ) => {
    // Determine the default HTML element based on variant
    const getDefaultElement = (variant: string | null | undefined) => {
      if (!variant) return 'p';

      if (variant.startsWith('display-')) return 'h1';
      if (variant.startsWith('heading-xl')) return 'h1';
      if (variant.startsWith('heading-lg')) return 'h2';
      if (variant.startsWith('heading-md')) return 'h3';
      if (variant.startsWith('heading-sm')) return 'h4';
      if (variant.startsWith('heading-xs')) return 'h5';
      if (variant === 'label') return 'label';
      if (variant === 'caption' || variant === 'overline') return 'span';
      if (variant === 'code') return 'code';

      return 'p';
    };

    const Comp = asChild ? Slot : as || getDefaultElement(variant);

    return (
      <Comp
        className={cn(
          typographyVariants({ variant, weight, color, align, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Typography.displayName = 'Typography';

// Convenience components for common use cases
const Heading = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ variant = 'heading-lg', ...props }, ref) => (
    <Typography ref={ref} variant={variant} {...props} />
  )
);
Heading.displayName = 'Heading';

const Text = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ variant = 'body-md', ...props }, ref) => (
    <Typography ref={ref} variant={variant} {...props} />
  )
);
Text.displayName = 'Text';

const Label = React.forwardRef<HTMLLabelElement, TypographyProps>(
  ({ variant = 'label', ...props }, ref) => (
    <Typography ref={ref} variant={variant} as="label" {...props} />
  )
);
Label.displayName = 'Label';

const Caption = React.forwardRef<HTMLSpanElement, TypographyProps>(
  ({ variant = 'caption', ...props }, ref) => (
    <Typography ref={ref} variant={variant} as="span" {...props} />
  )
);
Caption.displayName = 'Caption';

const Code = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = 'code', ...props }, ref) => (
    <Typography ref={ref} variant={variant} {...props} />
  )
);
Code.displayName = 'Code';

// Export all components
export {
  Caption,
  Code,
  Heading,
  Label,
  Text,
  Typography,
  typographyVariants,
  type TypographyProps,
};

// Usage examples for documentation:
/*
// Instead of: <div className="text-sm font-medium">{title}</div>
// Use: <Text variant="label">{title}</Text>

// Instead of: <h2 className="text-2xl font-bold">{heading}</h2>
// Use: <Heading variant="heading-lg">{heading}</Heading>

// Instead of: <p className="text-gray-500 text-xs">{description}</p>
// Use: <Caption>{description}</Caption>

// For table cells, form labels, etc:
<Text variant="body-sm" weight="medium">{row.original?.title}</Text>

// For headings with different levels:
<Heading variant="heading-xl">Page Title</Heading>
<Heading variant="heading-md">Section Title</Heading>
<Heading variant="heading-sm">Subsection Title</Heading>

// For status text with colors:
<Text variant="body-sm" color="success">Success message</Text>
<Text variant="body-sm" color="destructive">Error message</Text>

// For code snippets:
<Code>const example = "Hello World";</Code>

// For captions and small text:
<Caption>Last updated 2 hours ago</Caption>
*/
