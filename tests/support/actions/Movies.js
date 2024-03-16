
const { expect } = require("@playwright/test");

export class Movies {
    constructor(page) {
        this.page = page;
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click();
    }

    async submitForm() {
        await this.page.getByRole('button', { name: "Cadastrar" }).click();

    }

    async create(title, overview, company, select_year, cover, featured) {

        await this.goForm();

        await this.page.waitForResponse((response) => {
            return response.url().includes("/companies") && response.status() === 200;
        });

        await this.page.getByLabel("Titulo do filme").fill(title);
        await this.page.getByLabel("Sinopse").fill(overview);
        await this.page
            .locator("#select_company_id .react-select__dropdown-indicator")
            .click();
        await this.page
            .locator(".react-select__option")
            .filter({ hasText: company })
            .click();

        await this.page
            .locator("#select_year .react-select__dropdown-indicator")
            .click();
        await this.page
            .locator(".react-select__option")
            .filter({ hasText: select_year })
            .click();

        await this.page.locator('input[type="file"]')
            .setInputFiles('tests/support/fixtures/' + cover);

        if (featured === true) {

            await this.page.locator('.featured .react-switch').click();
        }

        await this.submitForm();
    }

    async alertHaveText(target) {
        await expect(this.page.locator(".alert")).toHaveText(target);
    }

}
