const {defineSupportCode} = require('cucumber');

defineSupportCode(function ({After,Before}) {

    After(function (scenarioResult) {
        if(scenarioResult.isFailed()){
            try{
               const screenshot = browser.saveScreenshot('./temp.png');
               this.attach(screenshot, 'image/png');
            }
            catch (e) {
                console.log(e);
            }
        }
    })
});