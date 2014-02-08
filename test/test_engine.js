// Functions to run the tests //////////////////////////////////////////////////
var testsPassed = 0;
var testsFailed = 0;

/**
 * Runs all availale tests.
 */
function runAllTests() {
    var testFunctions = _getAllTestFunctions();

    for (var i=0; i<testFunctions.length; i++) {
        console.log('-- ' +testFunctions[i]+ ' --');
        eval(testFunctions[i]+ '()'); // Call the function

        str = 'Passed: ' +testsPassed+ '. Failed: ' +testsFailed+ '.';
        if (testsFailed == 0) {
            console.log(str);
        } else {
            console.error(str);
        }
        testsPassed = 0;
        testsFailed = 0;
    }
}

/**
 * Returns an array with the names of all available functions which name start
 * with "test_".
 */
function _getAllTestFunctions() {
    var testFunctions = Array();

    for (var i in window) {
        if (i.indexOf('test_') == 0) {
            testFunctions.push(i);
        }
    }

    return testFunctions;
}

// Functions used by the tests /////////////////////////////////////////////////
/**
 * Performs a test and outputs the result in the log.
 *
 *   result:  the validated result (boolean).
 *   message: (optional) a message to display.
 */
function test(result, message) {
    str = '';

    if (message != undefined) {
        str += ': ' +message;
    }

    if (result == true) {
        console.log('Passed' +str);
        window.testsPassed++;
    } else {
        console.error('Failed' +str);
        window.testsFailed++;
    }
}