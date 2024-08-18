import { Page,expect } from "@playwright/test"

const titles = ["Forms", "Modal & Overlays", "Extra Components",
    "Charts", "Tables & Data", "Auth"
]

let i = 0

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

   
    async getTitle(){
        const titles = ["Forms", "Modal & Overlays", "Extra Components",
            "Charts", "Tables & Data", "Auth"
        ]
        for(const title of titles){
        const menuItem = await this.page.getByTitle(title, {exact: true})
        await menuItem.click();
        expect(await menuItem.getAttribute('aria-expanded')).toBeTruthy();
        i++;
    }
    }
}