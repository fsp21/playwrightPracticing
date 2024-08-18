import { Locator, Page, expect } from "@playwright/test"

export class FormLayouts {
    readonly page: Page
    readonly usingTheGrid: Locator
    readonly inlineForm: Locator
    readonly emailTextBox: Locator
    readonly passwordTextBox: Locator
    readonly radioButton1: Locator
    readonly radioButton2: Locator

    constructor(page: Page){
        this.page = page
        this.usingTheGrid = page.locator('nb-card', {hasText: 'Using the Grid'})
        this.inlineForm = page.locator('nb-card', {hasText: 'Inline form'})
        this.emailTextBox = this.usingTheGrid.getByRole('textbox', {name: "Email"})
        this.passwordTextBox = this.usingTheGrid.getByRole('textbox', {name: "Password"})
        this.radioButton1 = this.usingTheGrid.getByRole('radio', {name: 'Option 1'});
        this.radioButton2 = this.usingTheGrid.getByRole('radio', {name: 'Option 2'});
    }

    async submitInlineFormWithCredentialsAndCheckbox(){
        await this.inlineForm.locator('[placeholder="Jane Doe"]').fill('test1')
        await this.inlineForm.locator('[placeholder="Email"]').fill('test1')
        await this.inlineForm.getByRole('checkbox', {name: "Remember me"}).check({force: true});
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, option: string){

        await this.emailTextBox.fill(email)
        await this.passwordTextBox.fill(password)
        if(option == 'Option 1'){
            await this.radioButton1.check({force: true});
        }   else if (option == 'Option 2') {
                await this.radioButton2.check({force: true});
        }  
            await this.usingTheGrid.getByRole('button').click();
    }
}

