const { test: base, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { MoviesPage } = require("../pages/MoviesPage");
const { Toast } = require("../pages/Components");
const { LandingPage } = require("../pages/LandingPage");
const { executeSQL } = require("../support/database");

const test = base.extend({
    page: async ({ page }, use) => {
        
        const context = page;

        context["login"] = new LoginPage(page);
        context["movies"] = new MoviesPage(page);
        context["toast"] = new Toast(page);
        context["landing"] = new LandingPage(page);
        context["pgSql"] = executeSQL;

        await use(context);
    },
});

export { test, expect };
