const { test, expect } = require('../support');
const data = require('../support/fixtures/movies.json');


test('Deve poder cadastrar um novo filme', async ({ page }) => {
    const movie = data.create;

    await page.pgSql(`DELETE FROM movies WHERE title = '${movie.title}'`);
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.create(movie.title, movie.overview, movie.company, movie.select_year, movie.cover);
    await page.toast.containText('Cadastro realizado com sucesso!');

});

test('Não deve cadastrar quando o filme já estiver cadastrado', async ({ page, request }) => {
    const movie = data.duplicate;
    
    await request.api.postMovie(movie);
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.create(movie.title, movie.overview, movie.company, movie.select_year, movie.cover);
    await page.toast.containText('Este conteúdo já encontra-se cadastrado no catálogo');

});

test('Não deve cadastrar quando os campos obrigatórios não forem preenchidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.goForm();
    await page.movies.submitForm();

    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ]);
})