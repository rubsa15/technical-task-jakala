# Technical Task Jakala

A React application built with TypeScript, Vite, and TailwindCSS.

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router
- Testing Libraries:
  - Vitest
  - React Testing Library
  - Jest DOM

## Getting Started

1. Clone the repository:

```bash
git clone git@github.com:rubsa15/technical-task-jakala.git
cd technical-task-jakala
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the project for production (runs TypeScript compilation first)
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint to check code quality
- `npm run test` - Runs tests using Vitest

## Project Structure

```
technical-task-jakala/
├── src/
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Testing

This project uses Vitest as the test runner along with React Testing Library for component testing. Run tests using:

```bash
npm run test
```

## Linting

ESLint is configured for code quality. Run the linter using:

```bash
npm run lint
```

## Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.
