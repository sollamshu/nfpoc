import { expect, type Locator, type Page } from '@playwright/test';

export class LatitudeLongitudeFinderByPlacePage {
  readonly page: Page;
  readonly placeNameInput: Locator;
  readonly findButton: Locator;
  readonly latLongLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.placeNameInput = page.locator('#place');
    this.findButton = page.locator('#btnfind');
    this.latLongLabel = page.locator('#latlngspan');
  }

  async findLatitudeLongitudeByPlace(name: string, expected: string) {
    await this.placeNameInput.pressSequentially(name);
    await this.findButton.click();
    await expect(this.latLongLabel).toHaveText(expected);
  }
}