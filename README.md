# Todo App E2E Tests

This project includes comprehensive end-to-end tests using Playwright.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests (headless mode)
```bash
npm run test:e2e
```

### Run tests with UI Mode (recommended for development)
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:e2e:headed
```

### Debug tests
```bash
npm run test:e2e:debug
```

### Run tests in specific browser
```bash
npm run test:e2e:chromium
npm run test:e2e:firefox
npm run test:e2e:webkit
```

### View test report
```bash
npm run test:e2e:report
```

## Test Coverage

The E2E tests cover the following scenarios:

### Basic Functionality
- ✅ Load the app with empty todo lists
- ✅ Add a new todo item
- ✅ Add multiple todo items
- ✅ Clear input field after adding todo

### Validation
- ✅ Show error toast when adding duplicate todo
- ✅ Prevent adding empty todo

### Todo Management
- ✅ Mark todo as done (move to completed list)
- ✅ Edit an existing todo
- ✅ Delete a completed todo
- ✅ Clear input field after saving edited todo

### Progress Tracking
- ✅ Update progress bar when completing todos
- ✅ Calculate correct percentage (0%, 50%, 100%)

### Complex Workflows
- ✅ Complete workflow: add → edit → complete → delete
- ✅ Maintain multiple todos in different states
- ✅ Handle multiple active and completed todos simultaneously

## Test Structure

```
__tests__/
└── todo.spec.js    # Main test file with all E2E scenarios
```

## Configuration

The `playwright.config.js` file is configured to:
- Run tests across multiple browsers (Chromium, Firefox, WebKit)
- Test mobile viewports (Mobile Chrome, Mobile Safari)
- Automatically start dev server before tests
- Capture screenshots on failure
- Generate HTML reports
- Enable trace on retry

## CI/CD Integration

The tests are ready for CI/CD integration. They will:
- Run in headless mode
- Retry failed tests up to 2 times
- Run tests sequentially (not in parallel)
- Fail the build if `test.only` is found

## Tips

1. **Use UI Mode during development**: It provides a great debugging experience
   ```bash
   npm run test:e2e:ui
   ```

2. **Debug failing tests**: Use debug mode to step through tests
   ```bash
   npm run test:e2e:debug
   ```

3. **Check test reports**: After running tests, view the HTML report
   ```bash
   npm run test:e2e:report
   ```

4. **Run specific test**: Use the `-g` flag to match test names
   ```bash
   npx playwright test -g "should add a new todo"
   ```

## Common Issues

### Port Already in Use
If port 5173 is already in use, update the `baseURL` in `playwright.config.js` to match your dev server port.

### Timeouts
If tests are timing out, you can increase the timeout in individual tests:
```javascript
test('slow test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
  // ... test code
});
```

### Flaky Tests
If tests are flaky, consider:
- Adding explicit waits: `await page.waitForLoadState('networkidle')`
- Using more specific selectors
- Checking for race conditions in your app

## Further Reading

- [Playwright Documentation](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Tests](https://playwright.dev/docs/debug)