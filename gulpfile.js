const gulp = require('gulp');
const selenium = require('selenium-standalone');
const report = require('cucumber-html-reporter');
const jsonReportPath = 'tests/reports/json';
const htmlReportPath = 'tests/reports/html';
const path = require('path');
const webdriver = require('gulp-webdriver');

const cucumberReportOpts = {
    theme: 'bootstrap',
    jsonDir: jsonReportPath,
    output: htmlReportPath+'/report.html',
    brandTitle: 'Demo Report',
    reportSuiteAsScenarios: true,
    launchReport: true,
    storeScreenshots: true,
    metadata: {
        "App Version": "",

    }
};

gulp.task('report', (done) => {
    try{
        report.generate(cucumberReportOpts)
    }
    catch (error){
        console.log(error);
        done();
    }
} );

gulp.task('selenium-install', (done)=> {
    selenium.install({
            // check for more recent versions of selenium here:
            // https://selenium-release.storage.googleapis.com/index.html
            version: '3.5.0',
            baseURL: 'https://selenium-release.storage.googleapis.com',
            drivers: {
                chrome: {
                    // check for more recent versions of chrome driver here:
                    // https://chromedriver.storage.googleapis.com/index.html
                    version: '2.35',
                    arch: process.arch,
                    baseURL: 'https://chromedriver.storage.googleapis.com'
                },
                // ie: {
                //     // check for more recent versions of internet explorer driver here:
                //     // https://selenium-release.storage.googleapis.com/index.html
                //     version: '3.9.0',
                //     arch: process.arch,
                //     baseURL: 'https://selenium-release.storage.googleapis.com'
                // }
            },

            logger: (message)=> {
                // process.stdout.write(message);
            },
            progressCb: function (totalLength, progressLength, chunkLength) {
                // process.stdout.write('Downloading drivers ${Math.round(progressLength/totalLength)*100}% \n ')

            }
        },
        err => {
            if(err){
                console.log(err);
                return done(err)
            }

        });
});

gulp.task('selenium-start',(done)=> {

    console.log('------------------Starting selenium-------------');
    selenium.start({

        version: '3.5.0',
        drivers: {
            chrome: {
                version: '2.35'
            }
        },
        // spawnOptions: {
        //     stdio: 'inherit'
        // }
    }, function(err, child) {
        selenium.child = child;
        console.log('selenium is up and running');
        if (err) {
            console.log(err);
        }

    done();
    });
});
gulp.task('runTest', (done)=> {
    return gulp.src('tests/conf/wdio.conf.js')
        .pipe(webdriver()).
         once('end', ()=> {
            selenium.child? selenium.child.kill(): console.log('No selenium is running')
        }).
        on('error', ()=>{
                done();
            })
});

var gulpSequence = require('gulp-sequence');
gulp.task('test',gulpSequence('selenium-start','runTest'));