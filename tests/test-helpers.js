export async function registerUser ( { page }, first, last, email, password ) {
    await page.goto('/register');
    await page.getByTestId('register-firstname').fill(first);
    await page.getByTestId('register-lastname').fill(last);
    await page.getByTestId('register-email').fill(email);
    await page.getByTestId('register-password').fill(password);
    await page.waitForTimeout(500);
    await page.getByLabel('Confirm Password*').fill(password);
    await page.getByRole('button', { name: 'Sign Up' }).click();
    return;
}

async function loginUser ( { page }, email, password ) {
    await page.goto('login');
    await page.getByRole('textbox', { name: 'Email Address' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Log In' }).click();
    return;
};

export async function registerLoginUser ( { page }, first, last, email, password ) {
    await registerUser( { page }, first, last, email, password );
    await page.waitForTimeout(500);
    await loginUser( { page }, email, password );
    return;
};

async function logoutUser ({ page }) {
    await page.goto('logout');
    return;
};

export async function hostGame ({ page }) {
    await page.goto('play');
    await page.waitForTimeout(500);
    await page.getByRole('link', { name: 'Host a Game' }).click();

    const code = await page.locator("#host-code").innerText()

    await page.getByRole('link', { name: "Continue" }).click();
    await logoutUser({ page });
    return code;
};

async function joinGame ({ page }, gameCode ) {
    await page.getByRole('link', { name: 'Join a Game' }).click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Enter Code').fill(gameCode);
    await page.getByRole('button', { name: 'Join' }).click();
    await page.waitForTimeout(500);
    return page.url().split("/").slice(-1)[0];
};

export async function startGame ({ page }) {
    await registerLoginUser({ page }, "David", "Jones", "djones@gmail.com", "1234abcd");
    await page.waitForTimeout(500);
    const gameCode = await hostGame({ page });
    await registerLoginUser({ page }, "Sally", "Fields", "sfields@gmail.com", "5678efgh");
    await joinGame({ page }, gameCode);
    await logoutUser({ page });
    await registerLoginUser({ page }, "David", "Smith", "dsmith@gmail.com", "abcd1234");
    await joinGame({ page }, gameCode);
    await logoutUser({ page });
    await registerLoginUser({ page }, "Alice", "Park", "apark@gmail.com", "efgh5678");
    await joinGame({ page }, gameCode);
    await logoutUser({ page });
    await page.waitForTimeout(500);
    await loginUser({ page }, "djones@gmail.com", "1234abcd");
    await joinGame({ page }, gameCode);
    await page.getByRole('button', { name: 'Start Game' }).click();
    return;
}