const { test } = require('../support');
const data = require('../support/fixtures/movies.json');





test('Deve poder cadastrar um novo filme', async ({ page }) => {
    const movie = data.create;

    await page.pgSql(`DELETE FROM movies WHERE title = '${movie.title}'`);
    await page.login.visit();
    await page.login.submitLoginForm('admin@zombieplus.com', 'pwd123');
    await page.movies.isLoggedIn();
    await page.movies.create(movie.title, movie.overview, movie.company, movie.select_year);
    await page.toast.containText('Cadastro realizado com sucesso!');

});