const { test, expect } = require('../support');
const data = require('../support/fixtures/movies.json');


test('Deve poder cadastrar um novo filme', async ({ page }) => {
    const movie = data.create;

    await page.pgSql(`DELETE FROM movies WHERE title = '${movie.title}'`);
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.create(movie.title, movie.overview, movie.company, movie.select_year, movie.cover);
    await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`);

});

test('Deve poder excluir um filme cadastrado', async ({ page, request }) => {
    const movie = data.delete;

    await request.api.postMovie(movie);
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.remove(movie.title);
    await page.popup.haveText(`Filme removido com sucesso.`);
});

test('Não deve cadastrar quando o filme já estiver cadastrado', async ({ page, request }) => {
    const movie = data.duplicate;

    await request.api.postMovie(movie);
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.create(movie.title, movie.overview, movie.company, movie.select_year, movie.cover);
    await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.
    `);

});

test('Não deve cadastrar quando os campos obrigatórios não forem preenchidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.goForm();
    await page.movies.submitForm();

    await page.movies.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ]);
})

