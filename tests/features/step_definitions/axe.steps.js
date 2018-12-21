var {defineSupportCode} = require('cucumber');
var axe = require('../../util/axe_config');



defineSupportCode(function ({And, But, Given, Then, When}) {

    When(/^I validate accessibility standard A and AA using AXE for (.*)$/, function (url) {

        browser.url(url);
        browser.pause(5000);
        // browser.saveScreenshot('./remo.png');
        return axe.testAccessibility(browser);

    });
});