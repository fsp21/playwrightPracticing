import { Locator, Page,expect } from "@playwright/test"

let i = 0

export class NavigationPage {
    readonly page: Page
    readonly forms: Locator
    readonly formsLayout: Locator
    readonly tablesAndData: Locator
    readonly smartTable: Locator
    readonly titles: string[]
    
    constructor(page: Page) {
        this.page = page;
        this.forms = page.getByText('Forms', {exact: true});
        this.formsLayout = page.getByText('Form Layouts', {exact: true});
        this.tablesAndData = page.getByText('Tables & Data');
        this.smartTable = page.getByText('Smart Table');
        this.titles = ["Forms", "Modal & Overlays", "Extra Components","Charts", "Tables & Data", "Auth"]
    }

    async formLayoutsPage(){
        await this.forms.click();
        await this.formsLayout.click();
    }

    async smartTablePage(){
        await this.tablesAndData.click();
        await this.smartTable.click();
    }

    async clickAllLinesPerTitleAndCheckIfOpened(){
        const titles = this.titles

        for(const title of titles){
        const menuItem = this.page.getByTitle(title, {exact: true})
        await this.page.waitForLoadState('networkidle');
        await menuItem.click();
        expect(await menuItem.getAttribute('aria-expanded')).toBeTruthy();
        i++;
    }
    }
}