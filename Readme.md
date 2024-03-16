![poster](https://raw.githubusercontent.com/qaxperience/thumbnails/main/playwright-zombie.png)

## 🤘 Sobre

Repositório do projeto de testes automatizados do sistema Zombie Plus, construído no curso Playwright Zombie Edition! O Playwright é uma ferramenta de código aberto desenvolvida pela Microsoft que revoluciona a automação de testes em sistemas web, oferecendo uma abordagem eficaz e altamente confiável.


Este projeto possui algumas implementações além das propostas no curso, como a execução da API e da aplicação web com um único comando, utilizando o arquivo desenvolvido start.sh.

## 💻 Tecnologias
- [Node.js](https://nodejs.org/)
- [Playwright](https://playwright.dev/)
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Faker](https://www.npmjs.com/package/@faker-js/faker)
- [PostgreSQL](https://www.postgresql.org/)
- [Allure](https://allurereport.org/)

## 🤖 Como executar

## 🐘 Config DB

Neste projeto, foi utilizado o [ElephantSQl](https://www.elephantsql.com/), um banco na nuvem gratuito para os testes. No entanto ficar a seu criterio o uso de outra plataforma ou até mesmo um banco de dados local.

Renomeie o arquivo .env.example para .env e insira as informações abaixo, completando o que está no bloco do 'Database'.

```
BASE_API=http://localhost:3333
BASE_URL=http://localhost:3000

# Database
DB_HOST= 
DB_DATABASE=
DB_USER=
DB_PASSWORD=
DB_PORT=
```


1. Clonar o repositório, instalar as dependências para rodar o projeto de automação
```
npm install
```

2. Instalar dependẽncias da api
```
cd api && npm install
```

3. Instalar dependẽncias da web
```
cd web && npm install
```

4. Iniciar aplicação para rodar os testes
```
chmod +x start.sh
npm run start
```

5. Executar testes em Headless
```
npm run test
```

6. Executar ver o relatório dos testes
```
allure generate
allure open
```