const { test: base, expect } = require("@playwright/test");
const { Login } = require("./actions/Login");
const { Movies } = require("./actions/Movies");
const { Toast } = require("./actions/Components");
const { Leads } = require("./actions/Leads");
const { executeSQL } = require("../support/database");

const test = base.extend({
    page: async ({ page }, use) => {
        
        const context = page;

        context["login"] = new Login(page);
        context["movies"] = new Movies(page);
        context["toast"] = new Toast(page);
        context["leads"] = new Leads(page);
        context["pgSql"] = executeSQL;

        await use(context);
    },
});

export { test, expect };
