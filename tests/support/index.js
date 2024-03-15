const { test: base, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { MoviesPage } = require("../pages/MoviesPage");
const { Toast } = require("../pages/Components");
const { LandingPage } = require("../pages/LandingPage");
const { executeSQL } = require('../support/database');

const test = base.extend({
    page: async ({ page }, use) => {
        await use({
            ...page,
            login: new LoginPage(page),
            movies: new MoviesPage(page),
            toast: new Toast(page),
            landing: new LandingPage(page),
            pgSql: executeSQL
        });
    },
});

export { test, expect };
