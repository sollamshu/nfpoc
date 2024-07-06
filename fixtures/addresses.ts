import { test as base } from '@playwright/test';

type Addresses = {
    address: string;
    expected: string;
};

const test = base.extend<{ addressesTestData: Addresses }>({
    addressesTestData: async ({}, use) => {
        const data: Addresses = {
            address: 'Miami Beach',
            expected: '(25.790653, -80.130043)'
        };
        await use(data);
    },
});

export { test };