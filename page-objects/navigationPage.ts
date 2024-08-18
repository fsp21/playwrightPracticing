import { Page,expect } from "@playwright/test"

export class NavigationPage {
    readonly page: Page
    
    constructor(page: Page) {
        this.page = page
    }

    async formLayoutsPage(){
        await this.page.getByText('Forms', {exact: true}).click();
        const formsDropdown = this.page.getByTitle('Forms', {exact: true});
        expect(await formsDropdown.getAttribute('aria-expanded')).toContain('true');
        await this.page.getByText('Form Layouts', {exact: true}).click();
    }

    async smartTablePagle(){
        await this.page.getByText('Tables & Data').click();
        await this.page.getByText('Smart Table').click();
    }
}