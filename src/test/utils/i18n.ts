// src/test/utils/i18n.ts
import { initReactI18next } from 'react-i18next';

import i18n, { i18n as I18n } from 'i18next';

export const createTestI18n = (): I18n => {
  const testI18n = i18n.createInstance();
  testI18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    resources: {
      en: {
        translation: {
          app: {
            title: 'Test App',
            description: 'Test Description',
          },
          common: {
            loading: 'Loading...',
            error: 'An error occurred',
            save: 'Save',
            cancel: 'Cancel',
            close: 'Close',
            edit: 'Edit',
            delete: 'Delete',
            submit: 'Submit',
            retry: 'Retry',
            back: 'Back',
            next: 'Next',
            search: 'Search',
            filter: 'Filter',
            sort: 'Sort',
            create: 'Create',
            add: 'Add',
            remove: 'Remove',
            update: 'Update',
            select: 'Select',
            required: 'Required',
            view: 'View',
            and: 'and',
          },
          auth: {
            login: 'Login',
            logout: 'Logout',
            signup: 'Sign Up',
            email: 'Email',
            password: 'Password',
            name: 'Name',
            confirmPassword: 'Confirm Password',
            acceptTerms: 'Accept Terms',
            createAccount: 'Create Account',
            signIn: 'Sign In',
            rememberMe: 'Remember Me',
            forgotPassword: 'Forgot Password',
            dontHaveAccount: "Don't have an account?",
            alreadyHaveAccount: 'Already have an account?',
            getStarted: 'Get Started',
            termsOfService: 'Terms of Service',
            privacyPolicy: 'Privacy Policy',
            errors: {
              loginFailed: 'Login failed',
              registrationFailed: 'Registration failed',
              userDataFailed: 'Failed to load user data',
            },
          },
          navigation: {
            home: 'Home',
            dashboard: 'Dashboard',
            profile: 'Profile',
            settings: 'Settings',
            users: 'Users',
            about: 'About',
            viewDemo: 'View Demo',
          },
          errors: {
            general: 'Something went wrong',
            notFound: 'Page not found',
            unauthorized: 'You are not authorized to view this page',
            forbidden: 'Access forbidden',
            serverError: 'Server error',
            offline: 'You are offline',
            tryAgain: 'Please try again',
            notFoundDescription: 'The page you are looking for does not exist.',
          },
          dashboard: {
            totalUsers: 'Total Users',
            revenue: 'Revenue',
            activeProjects: 'Active Projects',
            taskCompletion: 'Task Completion',
            performanceOverTime: 'Performance Over Time',
            userDistribution: 'User Distribution',
            recentActivity: 'Recent Activity',
            newUserJoined: 'New user {{name}} joined',
            taskCompleted: 'Task {{task}} completed',
          },
          home: {
            features: 'Features',
            readyToStart: 'Ready to Start?',
            ctaDescription:
              'Join thousands of users already using our platform.',
          },
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

  return testI18n;
};
