import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password1'); 
    this.loginButton = page.locator('button', { hasText: 'Login' });
  }

  async gotoLogin() {
    await this.page.goto(process.env.WEB_URL);
  }

  async login() {
    await this.emailInput.fill(process.env.USER);
    await this.passwordInput.fill(process.env.PASS);
    await this.loginButton.click();
  }
}