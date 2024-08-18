import { Locator, Page, expect } from "@playwright/test"
import { NavigationPage } from '../page-objects/navigationPage';
import { FormLayouts } from '../page-objects/formLayouts';

export class PageManager {
    readonly page: Page
    readonly navigationPage: NavigationPage
    readonly formLayouts: FormLayouts
    
    constructor(page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(page)
        this.formLayouts = new FormLayouts(page)
    }

    async navigateTo(){
        return this.navigationPage
    }

    async formLayoutsPage(){
        return this.formLayouts
    }

}