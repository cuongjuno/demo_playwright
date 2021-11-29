async function login(page, user) {
  await page.fill('data-test=username', user.username);
  await page.fill('data-test=password', user.password);
  await page.click('data-test=login-button');
}

exports.login = login;
