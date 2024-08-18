import { test, expect } from '@playwright/test';
import * as playwrightTestPage from '../fixtures/playwrightTestPage.json'
import { NavigationPage } from '../page-objects/navigationPage';

test.beforeEach('Navigate to test page', async ({ page }) => {
    await page.goto(playwrightTestPage.url);
});

test('Navigate to "Form Page"', async ({page}) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutsPage();
})

test('Navigate to "Smart Table Page"', async ({page}) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.smartTablePagle();
})