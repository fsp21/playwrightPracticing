import { test, expect } from '@playwright/test';
import * as playwrightTestPage from '../fixtures/playwrightTestPage.json'

test.beforeEach('Navigate to test page', async ({ page }) => {
  await page.goto(playwrightTestPage.url);

});


test.describe('Form Layouts Page', async () => {
    
  test.beforeEach('Click "Forms" and "Form Layouts"', async ({ page }) => {
    await page.getByText('Forms', {exact: true}).click();
    const formsDropdown = page.getByTitle('Forms', {exact: true});
    expect(await formsDropdown.getAttribute('aria-expanded')).toContain('true');
    await page.getByText('Form Layouts', {exact: true}).click();
  });

  test('Fill in Email textbox from "Using the Grid" nb-card', async ({ page }) => {
    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'}).fill('test@test.com');
  });

  test('Click and assert state of Radio Buttons from "Using the Grid" nb-card', async ({ page }) => {
    const radioButton1 = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('radio', {name: 'Option 1'});
    const radioButton2 = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('radio', {name: 'Option 2'});

    await radioButton1.check({force:true});
    await expect(radioButton1).toBeChecked();
    await expect(radioButton2).not.toBeChecked();

    await radioButton2.check({force:true});
    await expect(radioButton2).toBeChecked();
    await expect(radioButton1).not.toBeChecked();

  });

  test('Click and assert state of Checkbox from "Using the Grid" nb-card', async ({ page }) => {
    const checkbox = page.locator('nb-card', {hasText: 'Basic form'}).getByRole('checkbox', {name: 'Check me out'});

    await checkbox.check({force:true});
    await expect(checkbox).toBeChecked();

    await checkbox.uncheck({force:true});
    await expect(checkbox).not.toBeChecked();

  });
});

