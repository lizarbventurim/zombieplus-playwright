const { test, expect } = require('../support');
const username = 'Admin';

test("Deve acessar a página administrativa", async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', username);
});

test("Não deve acessar com a senha incorreta", async ({ page }) => {

    await page.login.visit();
    await page.login.submitLoginForm('admin@zombieplus.com', 'pwd1234');
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
    await page.toast.containText(message);

});

test("Não deve acessar quando o email  é inválido", async ({ page }) => {
    await page.login.visit();
    await page.login.submitLoginForm('teste.com.bw', 'pwd1234');
    await page.login.alertHaveText('Email incorreto');

});

test("Não deve acessar quando o email não é preenchido", async ({ page }) => {
    await page.login.visit();
    await page.login.submitLoginForm('', 'pwd1234');
    await page.login.alertHaveText('Campo obrigatório');

});

test("Não deve acessar quando a senha não é preenchida", async ({ page }) => {
    await page.login.visit();
    await page.login.submitLoginForm('teste@teste.com.br', '');
    await page.login.alertHaveText('Campo obrigatório');

});

test("Não deve acessar quando nenhum campo é preenchido", async ({ page }) => {
    await page.login.visit();
    await page.login.submitLoginForm('', '');
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório']);

});