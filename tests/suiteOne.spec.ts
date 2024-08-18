import { test, expect } from '@playwright/test';
import * as playwrightTestPage from '../fixtures/playwrightTestPage.json'
import { NavigationPage } from '../page-objects/navigationPage';



test.beforeEach('Navigate to test page', async ({ page }) => {
  await page.goto(playwrightTestPage.url);
});


test.describe('Form Layouts Page', async () => {
    
  test.beforeEach('Click "Forms" and "Form Layouts"', async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutsPage();
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


test('Click dropdown menu and assert options change', async ({ page }) => {
  
  // Storing the "theme dropdown" location and clicking it
  const dropdownMenu = page.locator('ngx-header .select-button');
  await dropdownMenu.click();

  // Storing all locations of the dropdown options in an array
  const dropdownOptions = await page.locator('nb-option').all();
  
  // Storing all text values of these options in an array for assertion after click
  const dropdownOptionsText = await page.locator('nb-option').allTextContents();
  
  // Declaring i to use in the loop
  let i = 0

  // Clicking all dropdown menu options
  for (const dropdownOption of dropdownOptions){
    // Click each option
    await dropdownOption.click();
    
    // Assert that the "dropdown menu" locator contains the text of the last selected option
    expect(await dropdownMenu.textContent()).toContain(dropdownOptionsText[i]);
    
    // Condition to avoid clicking dropdown menu after finishing and increasing i to continue loop
    if(i<3){
    await dropdownMenu.click()};
    i++ };

});

test('Locating elements in Web Tables', async ({ page }) => {
  
    const navigateTo = new NavigationPage(page);
    await navigateTo.smartTablePagle();

  const targetRow = page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"})
  await targetRow.locator('.nb-edit').click();
  await page.locator('input-editor').getByPlaceholder('Age').clear();
  await page.locator('input-editor').getByPlaceholder('Age').fill('30');
  await page.locator('.nb-checkmark').click();

  await expect(targetRow.locator('td').nth(6)).toHaveText('30'); 
});

test('Validating filter in table', async ({ page }) => {
  
  const navigateTo = new NavigationPage(page);
  await navigateTo.smartTablePagle();
  const ages = ["20", "30", "40", "2000"];
  const ageSearchBox = page.locator('input-filter').getByPlaceholder('Age');

  for (let age of ages){
    await ageSearchBox.fill(age);
    await page.waitForTimeout(500);
    const allRows = page.locator('tbody tr');

    for(let row of await allRows.all()){
      const ageValue = await row.locator('td').last().textContent()

      if(age == "2000"){
        await expect(page.locator('tbody')).toContainText("No data found")
      }
      else{
        expect(ageValue).toContain(age);
      }
    }
  }
});