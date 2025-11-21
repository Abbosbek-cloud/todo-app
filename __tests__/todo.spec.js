const { test, expect } = require('@playwright/test');

test.describe('Todo App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should load the app with empty todo lists', async ({ page }) => {
    // Check if warning messages are displayed for empty lists
    await expect(page.getByText("Todoga hali ma'lumotlar kiritilmagan")).toBeVisible();
    await expect(page.getByText("Halicha todo qo'shilmagan")).toBeVisible();

    // Check if progress bar shows 0%
    await expect(page.locator('.progress-bar')).toHaveText('0%');
  });

  test('should add a new todo item', async ({ page }) => {
    const todoText = 'Learn Playwright';

    // Type in the input field
    await page.getByPlaceholder('To do yozing').fill(todoText);

    // Click the "Add To Do" button
    await page.getByText('Add To Do').click();

    // Verify the todo appears in the list
    await expect(page.getByText(todoText)).toBeVisible();

    // Verify warning message is gone
    await expect(page.getByText("Todoga hali ma'lumotlar kiritilmagan")).not.toBeVisible();
  });

  test('should add multiple todo items', async ({ page }) => {
    const todos = ['First task', 'Second task', 'Third task'];

    for (const todo of todos) {
      await page.getByPlaceholder('To do yozing').fill(todo);
      await page.getByText('Add To Do').click();
    }

    // Verify all todos are visible
    for (const todo of todos) {
      await expect(page.getByText(todo)).toBeVisible();
    }
  });

  test('should show error toast when adding duplicate todo', async ({ page }) => {
    const todoText = 'Duplicate task';

    // Add todo first time
    await page.getByPlaceholder('To do yozing').fill(todoText);
    await page.getByText('Add To Do').click();

    // Try to add the same todo again
    await page.getByPlaceholder('To do yozing').fill(todoText);
    await page.getByText('Add To Do').click();

    // Check for error toast
    await expect(page.getByText('Bu todo sizda mavjud')).toBeVisible();
  });

  test('should not add empty todo', async ({ page }) => {
    // Click add button without typing anything
    await page.getByText('Add To Do').click();

    // Verify error toast appears
    await expect(page.getByText('Bu todo sizda mavjud')).toBeVisible();

    // Verify warning message is still visible (no todos added)
    await expect(page.getByText("Todoga hali ma'lumotlar kiritilmagan")).toBeVisible();
  });

  test('should mark todo as done', async ({ page }) => {
    const todoText = 'Task to complete';

    // Add a todo
    await page.getByPlaceholder('To do yozing').fill(todoText);
    await page.getByText('Add To Do').click();

    // Click the check button (success button with check icon)
    await page.getByTestId('complete').click();

    // Verify todo moved to done list (right column)
    const doneList = page.locator('.col-12.col-lg-6').last();
    await expect(doneList.getByText(todoText)).toBeVisible();

    // Verify todo is removed from active list
    const activeList = page.locator('.col-12.col-lg-6').first();
    await expect(activeList.getByText(todoText)).not.toBeVisible();

    // Verify "Todoga hali ma'lumotlar kiritilmagan" appears in active list
    await expect(page.getByText("Todoga hali ma'lumotlar kiritilmagan")).toBeVisible();
  });

  test('should update progress bar when completing todos', async ({ page }) => {
    const todos = ['Task 1', 'Task 2'];

    // Add two todos
    for (const todo of todos) {
      await page.getByPlaceholder('To do yozing').fill(todo);
      await page.getByText('Add To Do').click();
    }

    // Complete first todo
    await page.getByTestId('complete').first().click();

    // Progress should be 50%
    await expect(page.getByTestId('progress-bar')).toHaveText('50%');

    // Complete second todo
    await page.getByTestId('complete').click();

    // Progress should be 100%
    await expect(page.getByTestId('progress-bar')).toHaveText('100%');
  });

  test('should edit an existing todo', async ({ page }) => {
    const originalText = 'Original task';
    const updatedText = 'Updated task';

    // Add a todo
    await page.getByPlaceholder('To do yozing').fill(originalText);
    await page.getByText('Add To Do').click();

    // Click edit button (primary button with edit icon)
    await page.locator('.btn-primary').first().click();

    // Verify input is populated with the todo text
    await expect(page.getByPlaceholder('To do yozing')).toHaveValue(originalText);

    // Verify button changed to "Save"
    await expect(page.getByText('Save')).toBeVisible();

    // Update the text
    await page.getByPlaceholder('To do yozing').fill(updatedText);

    // Click Save
    await page.getByText('Save').click();

    // Verify updated text is visible
    await expect(page.getByText(updatedText)).toBeVisible();

    // Verify original text is not visible
    await expect(page.getByText(originalText)).not.toBeVisible();

    // Verify button changed back to "Add To Do"
    await expect(page.getByText('Add To Do')).toBeVisible();
  });

  test('should delete a completed todo', async ({ page }) => {
    const todoText = 'Task to delete';

    // Add and complete a todo
    await page.getByPlaceholder('To do yozing').fill(todoText);
    await page.getByText('Add To Do').click();

    await page.getByTestId('complete').click();

    // Delete the completed todo
    await page.getByTestId('delete').click();

    // Verify todo is removed
    await expect(page.getByText(todoText)).not.toBeVisible();

    // Verify warning message appears in done list
    await expect(page.getByText("Halicha todo qo'shilmagan")).toBeVisible();
  });

  test('should handle complete workflow: add, edit, complete, and delete', async ({ page }) => {
    const originalTodo = 'Buy groceries';
    const editedTodo = 'Buy groceries and cook dinner';

    // 1. Add todo
    await page.getByPlaceholder('To do yozing').fill(originalTodo);
    await page.getByText('Add To Do').click();
    await expect(page.getByText(originalTodo)).toBeVisible();

    // 2. Edit todo
    await page.locator('.btn-primary').first().click();
    await page.getByPlaceholder('To do yozing').fill(editedTodo);
    await page.getByText('Save').click();
    await expect(page.getByText(editedTodo)).toBeVisible();

    // 3. Complete todo
    await page.getByTestId('complete').first().click();
    const doneList = page.locator('.col-12.col-lg-6').last();
    await expect(doneList.getByText(editedTodo)).toBeVisible();

    // 4. Delete todo
    await page.getByTestId('delete').first().click();
    await expect(page.getByText(editedTodo)).not.toBeVisible();
  });

  test('should maintain multiple todos in different states', async ({ page }) => {
    const activeTodos = ['Active task 1', 'Active task 2'];
    const completedTodos = ['Completed task 1', 'Completed task 2'];

    // Add all todos
    for (const todo of [...activeTodos, ...completedTodos]) {
      await page.getByPlaceholder('To do yozing').fill(todo);
      await page.getByText('Add To Do').click();
    }

    // Complete specific todos
    for (const todo of completedTodos) {
      // Find the list item containing this todo and click its success button
      const listItem = page.locator('.list-group-item', { hasText: todo });
      await listItem.locator('.btn-success').click();
    }

    // Verify active todos are in left column
    const activeList = page.locator('.col-12.col-lg-6').first();
    for (const todo of activeTodos) {
      await expect(activeList.getByText(todo)).toBeVisible();
    }

    // Verify completed todos are in right column
    const doneList = page.locator('.col-12.col-lg-6').last();
    for (const todo of completedTodos) {
      await expect(doneList.getByText(todo)).toBeVisible();
    }

    // Verify progress is 50% (2 out of 4)
    await expect(page.locator('.progress-bar')).toHaveText('50%');
  });

  test('should clear input field after adding todo', async ({ page }) => {
    await page.getByPlaceholder('To do yozing').fill('Test task');
    await page.getByText('Add To Do').click();

    // Input should be cleared
    await expect(page.getByPlaceholder('To do yozing')).toHaveValue('');
  });

  test('should clear input field after saving edited todo', async ({ page }) => {
    await page.getByPlaceholder('To do yozing').fill('Original');
    await page.getByText('Add To Do').click();

    await page.locator('.btn-primary').first().click();
    await page.getByPlaceholder('To do yozing').fill('Edited');
    await page.getByText('Save').click();

    // Input should be cleared
    await expect(page.getByPlaceholder('To do yozing')).toHaveValue('');
  });
});
