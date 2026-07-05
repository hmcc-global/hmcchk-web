# Agent Guidelines for HMCCHK Web

This document provides guidelines for AI agents working on the HMCCHK web application.

## Project Overview

- **Frontend**: React 18 with Chakra UI, Redux, react-router-dom
- **Backend**: Node.js with Express (in `api/` folder)
- **Build Tool**: Create React App (react-scripts)

## Commands

### UI Application (in `ui/` folder)

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run a single test file
npm test -- --testPathPattern="App.test.js"

# Run tests in watch mode (interactive)
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Eject from Create React App
npm run eject
```

### Root Level

```bash
# Format code with Prettier
npx prettier --write "ui/src/**/*.{js,jsx}"
```

## Code Style Guidelines

### File Organization

- **Pages**: `ui/src/pages/` - routed pages, organized by feature/folder
  - PascalCase filenames: `HomeContainer.js`, `HeroSection.js`
  - Components used by only ONE page stay inside that page's folder
- **Components library**: `ui/src/components/` - the single import source for UI
  - `components/chakra/` is the ONLY place allowed to import `@chakra-ui/react`
    (enforced by ESLint `no-restricted-imports`); `components/icons.js` is the
    only place for `@chakra-ui/icons`. UI-library changes (the planned Tailwind
    migration, or any Chakra bump) are absorbed there via named overrides —
    see `ui/src/components/README.md`
  - Reusable (2+ pages) components live here: `import { Box } from 'components'`,
    `import FileUpload from 'components/FileUpload'`
- **Utils**: `ui/src/utils/` - non-UI shared logic (customAxios, domain helpers) - camelCase filenames
- **Constants**: Use dedicated files or constants at top of files
- Absolute imports resolve from `ui/src` via `ui/jsconfig.json` (`baseUrl: "src"`)

### Imports

```javascript
// 1. External packages (React, etc.) and the components library
import { Flex, Box, useToast } from 'components';
import { ChevronLeftIcon } from 'components/icons';
import { useState, useEffect } from 'react';

// 2. Shared utils (absolute from src) and relative imports (local components)
import { customAxios as axios } from 'utils/customAxios';
import HeroSection from './HeroSection';

// 3. Assets/resources
import logo from './assets/logo.png';
```

Never import `@chakra-ui/react` or `@chakra-ui/icons` directly — always go
through `components` / `components/icons`.

### Component Structure

```javascript
// Functional components with hooks
const ComponentName = (props) => {
  // Destructure props
  const { title, onSubmit } = props;

  // State
  const [data, setData] = useState(null);

  // Effects
  useEffect(() => {
    // effect logic
  }, []);

  // Event handlers
  const handleClick = () => {
    // handler logic
  };

  // Render
  return <Box>{/* JSX */}</Box>;
};

export default ComponentName;
```

### Naming Conventions

- **Components**: PascalCase (`HomeContainer`, `HeroSection`)
- **Functions/callbacks**: camelCase (`handleSubmit`, `onOpen`)
- **Constants**: camelCase or UPPER_SNAKE_CASE for true constants
- **Props**: camelCase (`onSubmit`, `isOpen`, `userData`)
- **File extensions**: `.js` JavaScript files

### for all Chakra UI Usage

- Use responsive props: `w={{ base: '100%', md: '50%' }}`
- Use semantic components: `Flex`, `Box`, `Container`, `VStack`, `HStack`
- Use `bgColor` for background colors (not `background`)
- Use `_hover`, `_active` for pseudo-states

```jsx
<Box
  w={{ base: '100%', md: '50%' }}
  bgColor="teal.500"
  _hover={{ bgColor: 'teal.600' }}
>
```

### Error Handling

```javascript
// Standard pattern - use try/catch with async/await
const fetchData = async () => {
  try {
    const { data } = await axios.get('/api/endpoint');
    setData(data);
  } catch (err) {
    console.log(err); // Current convention
    // Consider adding user feedback (toast/alert) for production
  }
};
```

### Async/Await

```javascript
// Always use try/catch with async functions
const getData = async () => {
  try {
    const response = await axios.get('/api/endpoint');
    return response.data;
  } catch (err) {
    console.log(err);
    throw err; // Re-throw if caller needs to handle
  }
};
```

### Conditional Rendering

```jsx
// Prefer ternary for simple conditions
{
  isLoading ? <Spinner /> : <Content />;
}

// Use && for render-if-true only
{
  showMessage && <Message />;
}

// Extract complex conditions to variables
const shouldShowForm = isAdmin && hasPermission;
{
  shouldShowForm && <AdminForm />;
}
```

### Event Handlers

```javascript
// Name handlers with "handle" prefix
const handleSubmit = (e) => {
  e.preventDefault();
  // logic
};

// For component callbacks
<ChildComponent onSubmit={handleSubmit} />;
```

### Responsive Design

```jsx
// Use Chakra's useBreakpointValue
const isMobile = useBreakpointValue({ base: true, md: false });

// Or responsive props
<Box display={{ base: 'block', md: 'none' }} />;
```

### Environment Variables

```javascript
// Use process.env.PUBLIC_URL for public assets
const imagePath = process.env.PUBLIC_URL + '/images/hero.jpg';

// For API URLs, use environment variables
const API_URL = process.env.REACT_APP_API_URL;
```

## Testing

- Place tests alongside components: `ComponentName.test.js`
- Use React Testing Library (already configured)
- Run single test: `npm test -- --testPathPattern="filename"`

```javascript
// Example test structure
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders component', () => {
  render(<MyComponent />);
  expect(screen.getByText('Title')).toBeInTheDocument();
});
```

## API Patterns

- Use `customAxios` from `../helpers/customAxios` for authenticated requests
- Handle responses with `{ data }` destructuring
- Always wrap async calls in try/catch

```javascript
import { customAxios as axios } from '../helpers/customAxios';

const fetchData = async () => {
  try {
    const { data } = await axios.get('/api/endpoint');
    return data;
  } catch (err) {
    console.log(err);
  }
};
```

## Pre-commit Checks

Before committing, ensure:

1. Code compiles: `npm run build` (in ui folder)
2. Tests pass: `npm test`
3. No console.log statements in production code (except error handling)

## Common Issues

- **CORS errors**: Check proxy configuration in `ui/package.json`
- **Build failures**: Clear node_modules and reinstall: `rm -rf ui/node_modules && cd ui && npm install`
- **API errors**: Verify backend is running and CORS is configured
