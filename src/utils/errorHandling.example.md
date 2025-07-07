# Error Handling Usage Examples

## Using the Error Handling System

The improved error handling system provides consistent, user-friendly error messages across the application.

### 1. In React Components with Toast Notifications

```typescript
import { toast } from 'sonner';
import { handleError } from '@/utils/errorHandling';

// In your component
try {
  const result = await someApiCall();
  // handle success
} catch (error) {
  // Context helps identify where the error occurred
  const errorMessage = handleError(error, 'customer.create');
  toast.error(errorMessage);
}
```

### 2. Using the ErrorAlert Component

```typescript
import { ErrorAlert } from '@/components/molecules/ErrorAlert';
import { useState } from 'react';

function MyComponent() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      await submitForm();
    } catch (error) {
      const message = handleError(error, 'form.submit');
      setError(message);
    }
  };

  return (
    <div>
      {error && (
        <ErrorAlert 
          message={error} 
          onDismiss={() => setError(null)} 
        />
      )}
      {/* rest of your component */}
    </div>
  );
}
```

### 3. Checking Error Types

```typescript
import { isNetworkError, isAuthenticationError, isValidationError } from '@/utils/errorHandling';

try {
  await apiCall();
} catch (error) {
  if (isNetworkError(error)) {
    // Handle network-specific issues
    toast.error("Please check your internet connection");
  } else if (isAuthenticationError(error)) {
    // Redirect to login
    navigate('/login');
  } else if (isValidationError(error)) {
    // Show form validation errors
    setFormErrors(error);
  } else {
    // Generic error handling
    toast.error(handleError(error, 'api.call'));
  }
}
```

### 4. Custom Error Messages

```typescript
// Provide a fallback message for specific cases
const errorMessage = handleError(
  error, 
  'payment.process',
  'Payment processing failed. Please try again.'
);
```

### 5. Adding New Error Mappings

To add new error mappings, update `/src/utils/errorMessages.ts`:

```typescript
// Add to backendErrorMapping
export const backendErrorMapping: Record<string, string> = {
  // ... existing mappings
  'Payment declined': ERROR_CODES.PAYMENT_DECLINED,
  'Insufficient funds': ERROR_CODES.INSUFFICIENT_FUNDS,
};

// Add corresponding user-friendly messages
export const errorMessages: Record<string, string> = {
  // ... existing messages
  'payment.declined': 'Your payment was declined. Please try a different payment method.',
  'payment.insufficient_funds': 'Insufficient funds. Please check your account balance.',
};
```

## Benefits

1. **Consistency**: All errors are displayed with the same format and style
2. **User-Friendly**: Technical error messages are transformed into helpful user messages
3. **Maintainable**: Error messages are centralized in one location
4. **Type-Safe**: TypeScript ensures proper error handling
5. **Extensible**: Easy to add new error types and messages