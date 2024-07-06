import { type Page } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { MyAccountPage } from '../../pages/myAccount.page';
import { LatitudeLongitudeFinderByPlacePage } from '../../pages/latitudeLongitudeFinderByPlace.page';
import { LatitudeLongitudeFinderByAddressPage } from '../../pages/latitudeLongitudeFinderByAddress.page';
import { AddressesTestData } from '../../enums/addresses';
import { test } from '../../fixtures/addresses';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

let page: Page;

test.beforeAll(async ({ browser }) => {
  console.log("process.env.WEB_URL: " + process.env.WEB_URL);
  console.log("process.env.USER: " + process.env.USER + ", process.env.PASS: " + process.env.PASS);
});

// Open the browser and go to the login page
test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.login();
});

// Close the browser
test.afterEach(async () => {
  page.close();
});

// Import data from the CSV file addresses 
const placesTestData = parse(fs.readFileSync(path.join(__dirname, '../../testData/places.csv')), {
  columns: true,
  skip_empty_lines: true
});

// Scenario using multiple data cases
for (const place of placesTestData) {
  test(`Verify user is able to find latitude and longitude by place: ${place.name}`, async () => {
      const myAccountPage = new MyAccountPage(page);
      const latitudeLongitudeFinderByPlacePage = new LatitudeLongitudeFinderByPlacePage(page);

      // Go to Latitude & Longitude Finder using a Place under Geographic Tools page
      await myAccountPage.gotoLatitudeLongitudeFinderByPlaceUnderGeographicTools();
      // Search using a Place and checking it is returning the proper Latitude & Longitude
      await latitudeLongitudeFinderByPlacePage.findLatitudeLongitudeByPlace(place.name, place.expected);
  });
}

// Scenario using enums
test('Verify user is able to find latitude and longitude by address using enums', async () => {
    const myAccountPage = new MyAccountPage(page);
    const latitudeLongitudeFinderByAddressPage = new LatitudeLongitudeFinderByAddressPage(page);

    // Go to Latitude & Longitude Finder using an Address under Geographic Tools page
    await myAccountPage.gotoLatitudeLongitudeFinderByAddressUnderGeographicTools();
    // Search using an Address and checking it is returning the proper Latitude & Longitude
    await latitudeLongitudeFinderByAddressPage.findLatitudeLongitudeByAddress(AddressesTestData.address, AddressesTestData.expected)
});

// Scenario using fixtures
test('Verify user is able to find latitude and longitude by address using fixtures', async ({ addressesTestData }) => {
  const myAccountPage = new MyAccountPage(page);
  const latitudeLongitudeFinderByAddressPage = new LatitudeLongitudeFinderByAddressPage(page);

  // Go to Latitude & Longitude Finder using an Address under Geographic Tools page
  await myAccountPage.gotoLatitudeLongitudeFinderByAddressUnderGeographicTools();
  // Search using an Address and checking it is returning the proper Latitude & Longitude
  await latitudeLongitudeFinderByAddressPage.findLatitudeLongitudeByAddress(addressesTestData.address, addressesTestData.expected)
});