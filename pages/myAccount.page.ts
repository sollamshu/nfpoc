import { expect, type Locator, type Page } from '@playwright/test';

export class MyAccountPage {
  readonly page: Page;
  readonly geographicToolsMenuOption: Locator;
  readonly latitudeLongitudeFinderByPlaceOption: Locator;
  readonly latitudeLongitudeFinderByAddressOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.geographicToolsMenuOption = page.locator('a', { hasText: 'Geographic Tools' });
    this.latitudeLongitudeFinderByPlaceOption = page.locator('h5', { hasText: 'Latitude and Longitude Finder' }); 
    this.latitudeLongitudeFinderByAddressOption = page.locator('h5', { hasText: 'Address to Latitude and Longitude' }); 
  }

  async gotoLatitudeLongitudeFinderByPlaceUnderGeographicTools() {
    await this.geographicToolsMenuOption.click();
    await this.latitudeLongitudeFinderByPlaceOption.click();
    await this.page.waitForTimeout(5000);
  }

  async gotoLatitudeLongitudeFinderByAddressUnderGeographicTools() {
    await this.geographicToolsMenuOption.click();
    await this.latitudeLongitudeFinderByAddressOption.click();
    await this.page.waitForTimeout(5000);
  }
}