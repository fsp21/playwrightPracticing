import { test, expect } from '@playwright/test';
import * as playwrightTestPage from '../fixtures/playwrightTestPage.json'
import { PageManager } from '../page-objects/pageManager';

test.beforeEach('Navigate to test page', async ({ page }) => {
    await page.goto(playwrightTestPage.url);
});

test('Navigate to different options from the side menu', async ({page}) => {
    const pm = new PageManager(page);

    await pm.formLayoutsPage();
    await pm.navigationPage.smartTablePage();
})

test("Open all menus and check if they're opened", async ({page}) => {
    const pm = new PageManager(page);

    await pm.navigationPage.clickAllLinesPerTitleAndCheckIfOpened();
})

test("Inline form testing", async ({page}) => {
    const pm = new PageManager(page);
    
    await pm.navigationPage.formLayoutsPage()
    await pm.formLayouts.submitInlineFormWithCredentialsAndCheckbox();
})