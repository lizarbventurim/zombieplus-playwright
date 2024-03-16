const { test: base, expect } = require("@playwright/test");
const { Login } = require("./actions/Login");
const { Movies } = require("./actions/Movies");
const { Popup } = require("./actions/Components");
const { Leads } = require("./actions/Leads");
const { executeSQL } = require("../support/database");
const { Api } = require("./api");

const test = base.extend({
    page: async ({ page }, use) => {

        const context = page;

        context["login"] = new Login(page);
        context["movies"] = new Movies(page);
        context["popup"] = new Popup(page);
        context["leads"] = new Leads(page);
        context["pgSql"] = executeSQL;

        await use(context);
    },

    request: async ({ request }, use) => {
        const context = request;
        context['api'] = new Api(request);
        await context['api'].setToken();

        await use(context);
    }
});

export { test, expect };
