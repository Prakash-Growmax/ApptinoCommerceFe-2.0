// plopfile.js
export default function (plop) {
  // Component generator
  plop.setGenerator('component', {
    description: 'Create a new React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase):',
        validate: input => {
          if (!input) return 'Component name is required';
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(input)) {
            return 'Component name must be in PascalCase';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'type',
        message: 'Component type:',
        choices: ['atoms', 'molecules', 'organisms', 'templates'],
        default: 'atoms',
      },
      {
        type: 'confirm',
        name: 'withStory',
        message: 'Create Storybook story?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'withTest',
        message: 'Create test file?',
        default: true,
      },
    ],
    actions: data => {
      const actions = [];

      // Create component file
      actions.push({
        type: 'add',
        path: 'src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component.tsx.hbs',
      });

      // Create index file
      actions.push({
        type: 'add',
        path: 'src/components/{{type}}/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/index.ts.hbs',
      });

      // Create story file
      if (data.withStory) {
        actions.push({
          type: 'add',
          path: 'src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
          templateFile: 'plop-templates/Component.stories.tsx.hbs',
        });
      }

      // Create test file
      if (data.withTest) {
        actions.push({
          type: 'add',
          path: 'src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
          templateFile: 'plop-templates/Component.test.tsx.hbs',
        });
      }

      return actions;
    },
  });

  // Hook generator
  plop.setGenerator('hook', {
    description: 'Create a new custom hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Hook name (without "use" prefix):',
        validate: input => {
          if (!input) return 'Hook name is required';
          if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(input)) {
            return 'Hook name must be camelCase';
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'withTest',
        message: 'Create test file?',
        default: true,
      },
    ],
    actions: data => {
      const actions = [];

      // Create hook file
      actions.push({
        type: 'add',
        path: 'src/hooks/use{{pascalCase name}}.ts',
        templateFile: 'plop-templates/Hook.ts.hbs',
      });

      // Create test file
      if (data.withTest) {
        actions.push({
          type: 'add',
          path: 'src/hooks/use{{pascalCase name}}.test.ts',
          templateFile: 'plop-templates/Hook.test.ts.hbs',
        });
      }

      // Update hooks index file
      actions.push({
        type: 'append',
        path: 'src/hooks/index.ts',
        template: "export * from './use{{pascalCase name}}';",
      });

      return actions;
    },
  });

  // Page generator
  plop.setGenerator('page', {
    description: 'Create a new page component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Page name (PascalCase):',
        validate: input => {
          if (!input) return 'Page name is required';
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(input)) {
            return 'Page name must be in PascalCase';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'feature',
        message: 'Feature name (lowercase):',
        validate: input => {
          if (!input) return 'Feature name is required';
          if (!/^[a-z][a-z0-9-]*$/.test(input)) {
            return 'Feature name must be lowercase with hyphens';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'route',
        message: 'Route path (e.g., /users, /dashboard):',
        default: answers => `/${answers.name.toLowerCase()}`,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/features/{{feature}}/routes/{{pascalCase name}}Page.tsx',
        templateFile: 'plop-templates/Page.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/features/{{feature}}/routes/{{pascalCase name}}Page.test.tsx',
        templateFile: 'plop-templates/Page.test.tsx.hbs',
      },
    ],
  });

  // Feature generator
  plop.setGenerator('feature', {
    description: 'Create a new feature module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Feature name (lowercase):',
        validate: input => {
          if (!input) return 'Feature name is required';
          if (!/^[a-z][a-z0-9-]*$/.test(input)) {
            return 'Feature name must be lowercase with hyphens';
          }
          return true;
        },
      },
    ],
    actions: [
      // Create feature structure
      {
        type: 'add',
        path: 'src/features/{{name}}/index.ts',
        template: '// Export all {{name}} feature exports\n',
      },
      {
        type: 'add',
        path: 'src/features/{{name}}/api/index.ts',
        template: '// {{pascalCase name}} API exports\n',
      },
      {
        type: 'add',
        path: 'src/features/{{name}}/components/index.ts',
        template: '// {{pascalCase name}} component exports\n',
      },
      {
        type: 'add',
        path: 'src/features/{{name}}/hooks/index.ts',
        template: '// {{pascalCase name}} hooks exports\n',
      },
      {
        type: 'add',
        path: 'src/features/{{name}}/routes/index.ts',
        template: '// {{pascalCase name}} routes exports\n',
      },
      {
        type: 'add',
        path: 'src/features/{{name}}/stores/index.ts',
        template: '// {{pascalCase name}} stores exports\n',
      },
      {
        type: 'add',
        path: 'src/features/{{name}}/types/index.ts',
        template: '// {{pascalCase name}} type definitions\n',
      },
      {
        type: 'add',
        path: 'src/features/{{name}}/utils/index.ts',
        template: '// {{pascalCase name}} utility functions\n',
      },
    ],
  });
}
