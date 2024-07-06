import { expect, type Locator, type Page } from '@playwright/test';

export class LatitudeLongitudeFinderByAddressPage {
  readonly page: Page;
  readonly placeAddressInput: Locator;
  readonly findButton: Locator;
  readonly latLongLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.placeAddressInput = page.getByPlaceholder('Type address here to get lat long');
    this.findButton = page.locator('#btnfind');
    this.latLongLabel = page.locator('#latlngspan');
  }

  async findLatitudeLongitudeByAddress(address: string, expected: string) {
    await this.placeAddressInput.pressSequentially(address);
    await this.findButton.click();
    await expect(this.latLongLabel).toHaveText(expected);
  }
}