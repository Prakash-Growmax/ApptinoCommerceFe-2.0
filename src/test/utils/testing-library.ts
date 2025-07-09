// export * from '@testing-library/react';

// // Re-export the custom render function (file is now .tsx)
// export { render } from './render';


// Export everything from @testing-library/react EXCEPT render
export { 
  screen, 
  fireEvent, 
  waitFor, 
  cleanup,
  act,
  // ... other exports you need, but NOT render
} from '@testing-library/react';

// Export your custom render function
export { render } from './render';