const {defineSupportCode} = require('cucumber');

const fs = require('fs-extra');
const path = require('path');
const JsonFormatter = require('cucumber').JsonFormatter;

const stripNonChars = (stringVal, replaceVal = ' ') => {
    if(!stringVal){
        return '';
    }

    return stringVal.replace(/\W+/g, replaceVal);
};

defineSupportCode(function({registerListener}){

    try{
        const jsonFileFormatter = new JsonFormatter;
        const capabilities = global.browser.desiredCapabilities;
        const browserName = capabilities.browserName || 'unknown';
        const currentTime = new Date().toJSON().replace(/:/g, '-');
        const reportsFolderPath = path.join(__dirname,'../../reports/');
        const jsonReportPath = path.join(__dirname,'../../reports/json');
        const htmlFolderPath = path.join(__dirname,'../../reports/html');


        if(!fs.existsSync(reportsFolderPath)){
            fs.mkdirSync(reportsFolderPath);
        }

        if(!fs.existsSync(htmlFolderPath)){
            fs.mkdirSync(htmlFolderPath);
        }
        if(!fs.existsSync(jsonReportPath)){
            fs.mkdirSync(jsonReportPath);
        }

        const reportFileName = stripNonChars(`${browserName}-cucumber-test-results-${currentTime}-${Math.random()})`);
        const reportFilePath = path.join(__dirname,`../../reports/json/${reportFileName}.json`);
        console.log("Running tests and generating report");
        jsonFileFormatter.log = function(json){
            fs.open(reportFilePath, 'w+', (error, destinationFile)=> {
                try{
                    if(error){
                        fs.mkdirpSync(reportsFolderPath);
                        destinationFile = fs.openSync(reportFilePath, 'w+');
                    }

                    fs.writeSync(destinationFile, json);
                }
                catch(error){
                    console.log(error);
                }
            });
        };

        registerListener(jsonFileFormatter);
    }
    catch (e) {
        console.log(e);
    }
})