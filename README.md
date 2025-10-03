# ExpensesHub Project

A modern expense tracking and management application built with quality, performance, and user experience at its core.

## Project Principles

This project adheres to a strict [Constitution](.specify/memory/constitution.md) that defines our core principles:

1. **Code Quality Excellence** - High standards for maintainability, type safety, and documentation
2. **Testing Standards (Playwright)** - Comprehensive E2E testing with Playwright exclusively
3. **User Experience Consistency** - Unified design system, accessibility, and responsive design
4. **Performance Requirements** - Fast, efficient, and scalable application meeting Core Web Vitals

All contributions must comply with these constitutional principles. See the [Constitution](.specify/memory/constitution.md) for full details.

## Getting Started

[To be added as project develops]

## Development

[To be added as project develops]

## Testing

This project uses [Playwright](https://playwright.dev/) for all end-to-end testing.

```bash
# Install Playwright
npm install -D @playwright/test

# Run tests
npx playwright test

# Run tests in UI mode
npx playwright test --ui

# Run tests in headed mode
npx playwright test --headed
```

See our [Testing Standards](.specify/memory/constitution.md#principle-2-testing-standards-with-playwright) for complete testing guidelines.

## Contributing

Before contributing, please:

1. Read the [Project Constitution](.specify/memory/constitution.md)
2. Ensure all code meets quality standards (TypeScript strict, linting, formatting)
3. Write Playwright E2E tests for all user-facing features
4. Verify accessibility and responsive design requirements
5. Check performance impact (bundle size, Core Web Vitals)

All pull requests must pass:

- ESLint and Prettier checks
- All Playwright E2E tests
- Code review verifying constitutional compliance

## License

[To be determined]
