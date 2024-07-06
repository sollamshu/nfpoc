# Installation
install nodejs
npm init playwright@latest
npm install csv

# Command to execute the web scenarios
WEB_URL=https://www.latlong.net/user/login USER=sol.lam@gmail.com PASS=Qwerty123! npx playwright test --config=playwright.config.ts --project=web --headed

# Command to execute the api scenarios
API_URL=https://demoqa.com USER=sol.lam@gmail.com PASS=Qwerty123! npx playwright test --config=playwright.config.ts --project=api