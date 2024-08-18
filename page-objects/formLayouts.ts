import { Locator, Page, expect } from "@playwright/test"

export class FormLayouts {
    readonly page: Page
    readonly usingTheGrid: Locator
    readonly emailTextBox: Locator
    readonly passwordTextBox: Locator
    readonly radioButton1: Locator
    readonly radioButton2: Locator

    constructor(page: Page){
        this.page = page
        this.usingTheGrid = page.locator('nb-card', {hasText: 'Using the Grid'})
        this.emailTextBox = this.usingTheGrid.getByRole('textbox', {name: "Email"})
        this.passwordTextBox = this.usingTheGrid.getByRole('textbox', {name: "Password"})
        this.radioButton1 = this.usingTheGrid.getByRole('radio', {name: 'Option 1'});
        this.radioButton2 = this.usingTheGrid.getByRole('radio', {name: 'Option 2'});
    }

    
    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, option: string){
        const usingTheGrid = this.page.locator('nb-card', {hasText: 'Using the Grid'})
        const radioButton1 = usingTheGrid.getByRole('radio', {name: 'Option 1'});
        const radioButton2 = usingTheGrid.getByRole('radio', {name: 'Option 2'});

        if(option == 'Option 1'){
            await this.emailTextBox.fill(email)
            await this.passwordTextBox.fill(password)
            await radioButton1.check({force: true});
            await usingTheGrid.getByRole('button').click();
        }   else if (option == 'Option 2') {
                await this.emailTextBox.fill(email)
                await this.passwordTextBox.fill(password)
                await radioButton2.check({force: true});
                await usingTheGrid.getByRole('button').click();
        }   else {
                await this.emailTextBox.fill(email)
                await this.passwordTextBox.fill(password)
                await usingTheGrid.getByRole('button').click();
                await usingTheGrid.getByRole('button').click();
        }

    }
}

