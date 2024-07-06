import { test, expect } from '@playwright/test';
import { DemoQaRequests } from '../../requests/demoQaRequests';

const demoQaRequests = new DemoQaRequests();

test.beforeAll(async ({ browser }) => {
    console.log("process.env.API_URL: " + process.env.API_URL);
    console.log("process.env.USER: " + process.env.USER + ", process.env.PASS: " + process.env.PASS);
});

test('Verify user is able to login and get a token', async ({ request }) => {
    // Call the Login endpoint
    const loginResponse = await demoQaRequests.login(request);
    // Get the response body
    const loginResponseBody = await loginResponse.json();
    // Check if the token is returned
    expect(loginResponseBody.token, 'Token should not be null').not.toBeNull;
    // Print the token
    console.log("token: " + loginResponseBody.token);
});

test('Verify user is able to get a list of books', async ({ request }) => {
    // Call the Books endpoint
    const getBooksResponse = await demoQaRequests.getBooks(request);
    // Get the response body
    const getBooksResponseBody = await getBooksResponse.json();
    // Check if it is returning books
    expect(getBooksResponseBody.books.length, 'Books length should be greater or equal to 0').toBeGreaterThanOrEqual(0);
    // Print the number of books
    console.log("books: " + getBooksResponseBody.books.length);
});