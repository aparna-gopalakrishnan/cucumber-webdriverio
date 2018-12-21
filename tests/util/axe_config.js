try{
    var axeBuilder = require('axe-webdriverio');
    var jsonfile = require('jsonfile');
    var tempJSON;
    var axeViolations;
    module.exports = {

    testAccessibility : function(browser) {

        //pass which standard to be validated, by default all three A, AA, AAA standards will be validated
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
    }
    }

}

catch(err){
  throw new Error(err);
}
