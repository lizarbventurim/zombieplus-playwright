
const { test } = require('../support');
const { faker } = require('@faker-js/faker');

//variables
const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
const registredEmail = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.';
const requiredFiledMessage = 'Campo obrigatório';
let leadName;
let leadEmail;



test.beforeAll(async () => {
  leadName = faker.person.fullName(); 
  leadEmail = faker.internet.email();
})

test('Deve cadastrar um lead na fila de espera ', async ({ page }) => {


  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(leadName, leadEmail);
  await page.toast.containText(message);


});

test('Não deve cadastrar um lead na fila de espera quando o email já tiver cadastrado', async ({ page }) => {

  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(leadName, leadEmail);
  await page.toast.containText(registredEmail);


});

test('Não deve cadastrar com email incorreto', async ({ page }) => {

  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(leadName, 'lizarbpacheco.com.br');
  await page.landing.alertHaveText('Email incorreto');


});

test('Não deve cadastrar Quando o nome não é preenchido', async ({ page }) => {

  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('', leadEmail);
  await page.landing.alertHaveText(requiredFiledMessage);

});

test('Não deve cadastrar com email não é preenchido', async ({ page }) => {

  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(leadName, '');
  await page.landing.alertHaveText(requiredFiledMessage);

});

test('Não deve cadastrar quando nenhuma informação é preenchida', async ({ page }) => {

  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('', '');

  await page.landing.alertHaveText([
    requiredFiledMessage,
    requiredFiledMessage
  ]);

});

