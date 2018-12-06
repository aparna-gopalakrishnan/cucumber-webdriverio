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
