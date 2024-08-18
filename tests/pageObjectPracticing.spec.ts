import { test, expect } from '@playwright/test';
import * as playwrightTestPage from '../fixtures/playwrightTestPage.json'
import { NavigationPage } from '../page-objects/navigationPage';


test.beforeEach('Navigate to test page', async ({ page }) => {
    await page.goto(playwrightTestPage.url);
});

test('Navigate to different options from the side menu', async ({page}) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutsPage();
    await navigateTo.smartTablePagle();
})

test("Open all menus and check if they're opened", async ({page}) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.getTitle();
    // await navigateTo.formLayoutsPage();
    // await navigateTo.smartTablePagle();
})