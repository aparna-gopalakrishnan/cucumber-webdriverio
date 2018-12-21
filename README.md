# cucumber-webdriverio
An end to end test automation framework using cucumberjs and webdriverio

V1.0
Cucumber execution using selenium-standalone
Instructions

Pre-requisites
1. NodeJS must be installed on the machine ( I have tested on node 6 & 8)
2. GIT must be installed on the machine (for Windows)

Set up guilde
1. Clone/download the project
2. Install dependencies by using 'npm install or npm i"
3. Install gulp globally - npm i gulp -g (sometimes if you dont do this, you might get error saying gulp is not recognozed command)
4. Gulp tasks are created for selenium installation, starting and invoking wdio.conf file
5. Once the dependenies are installed succesfully, please provide gulp selenium-install to download the dependencies (this is one time unless you change any driver versions)
This is downloading required drivers from https://selenium-release.storage.googleapis.com (if you are behind a proxy network, and downloading the dependencies from a private cloud/repository, you may have to replace this link with the right one)
6. Once the driver installation is done, to test our first sample script, execute the next command - gulp test
   gulp test is having two tasks getting invoked sequentially by using gulp-sequence
   a) gulp selenium-start - this will start the server (in previous step we have already installed)
   b) gulp runTest - this is calling wdio.conf.js where we have feature/step/support files mentioned and trigger the test execution
7. Once the execution is done, you will find json reports in tests/reports/json folder
8. To generate html reports, use gulp report. This will generate html reports and save in tests/reports/html folder
    we are using cucumber-html-reporter plugin to generate html report
    
 ---------------------------- Accessibility Testing with WebdriverIO and Cucumber--------------------------------------
 We can do accessibility testing with webdriverIO now with a utility - axe-webdriverIO
 Axe is an open source product from Deque and it works as a browser plugin and automated solution
 Axe-webdriverIO is a webdriverIO binding of axe-webdriverjs
 In this framework, we have created a configuration file for accessibility named accessibility.conf.js where accessibility feature file and step definitions can be configured.Also created a gulp task 'axe' to invoke accessibility configuration file and selenium tasks.
 below code will do the axe core rules injection to the html and the same will be validated and provided the results-
    return new axeBuilder(browser).withTags(['wcag2a','wcag2aa','wcag2aa']).analyze()
            .then(function(results) {

                axeViolations = results.value.violations.length;
                report = results.value.violations;
                //If any violation found, write the error into a json file, and mark the test as failed with error details
                //Violation description will have description of the problem, rule id, what and where to fix in html
                if (axeViolations > 0) {

                    //Marking test as failed if any accessibility violation is found

                    return Promise.reject(
                        new Error(
                            JSON.stringify(report, null, '\t'))

                    );
                }
            });

