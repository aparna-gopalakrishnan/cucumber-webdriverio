var {defineSupportCode} = require('cucumber');

defineSupportCode(function ({And, But, Given, Then, When}) {
    Given(/^I launch url$/, function () {
            browser.url('https://www.google.co.uk/')
        browser.click('//*[@id="aa"]')
    });
});