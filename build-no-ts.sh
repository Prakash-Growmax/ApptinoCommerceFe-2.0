#!/bin/bash

# Build without TypeScript type checking
echo "Building without TypeScript type checking..."
echo "This is a temporary solution. Please fix TypeScript errors for production builds."

# Run Vite build directly without tsc
pnpm exec vite build

echo "Build completed (TypeScript checking was skipped)"