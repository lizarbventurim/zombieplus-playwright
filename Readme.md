![poster](https://raw.githubusercontent.com/qaxperience/thumbnails/main/playwright-zombie.png)

# Zombie+ | Testes automatizados com Playwright

[![Testes E2E](https://github.com/lizarbventurim/zombieplus-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/lizarbventurim/zombieplus-playwright/actions/workflows/playwright.yml)

Projeto de testes automatizados (E2E e API) do sistema **Zombie Plus**, criado no curso Playwright Zombie Edition e evoluído com práticas de mercado: pipeline no GitHub Actions, banco local com Docker, relatórios Playwright e Allure e testes sem dependência de dados antigos.

## 🧪 O que é testado

| Área | Cenários |
| --- | --- |
| Login | acesso válido, senha incorreta, e-mail inválido e campos obrigatórios |
| Leads (fila de espera) | cadastro, e-mail duplicado, e-mail inválido e campos obrigatórios |
| Filmes (catálogo) | cadastro, exclusão, título duplicado, campos obrigatórios e busca |

Os dados de apoio são criados pela API e pelo banco (PostgreSQL), e os testes seguem o padrão **Page Actions + fixtures**, em `tests/support`.

## 💻 Tecnologias

[Node.js](https://nodejs.org/) · [Playwright](https://playwright.dev/) · JavaScript · [Faker](https://fakerjs.dev/) · PostgreSQL · Docker · [Allure](https://allurereport.org/) · GitHub Actions

## 🚀 Como executar

Pré-requisitos: Node.js 20 ou superior e Docker.

```bash
# 1. dependências (raiz, API e web)
npm install
npm --prefix api install
npm --prefix web install

# 2. variáveis de ambiente (os valores já servem para o banco do Docker)
cp .env.example .env
cp api/.env.example api/.env

# 3. banco PostgreSQL, tabelas e dados iniciais
npm run db:up
npm run db:setup

# 4. aplicação (API na porta 3333 e web na 3000)
npm run start

# 5. em outro terminal: navegador do Playwright e testes
npx playwright install chromium
npm test
```

### Outros comandos

| Comando | O que faz |
| --- | --- |
| `npm run test:ui` | abre o modo interativo do Playwright |
| `npm run test:headed` | roda com o navegador visível |
| `npm run report` | abre o relatório HTML do Playwright |
| `npm run allure` | gera e abre o relatório do Allure |
| `npm run db:down` | desliga o banco |

## 🤖 Integração contínua

A cada push e pull request, o workflow [`playwright.yml`](.github/workflows/playwright.yml) sobe um PostgreSQL, cria as tabelas, inicia a API e a web, executa todos os testes e publica os relatórios como artefatos da execução.

## 📁 Estrutura

```
tests/
  e2e/          # cenários (login, leads, movies)
  support/      # actions, API helper, banco, fixtures
api/            # API do Zombie+ (do curso)
web/            # aplicação web já compilada (do curso)
docker-compose.yml
.github/workflows/playwright.yml
```

## ✍️ Autor

**Lizarb Venturim**, Senior QA Engineer · [LinkedIn](https://www.linkedin.com/in/lizarbventurim/) · [Portfólio](https://lizarb.venturim.me)
