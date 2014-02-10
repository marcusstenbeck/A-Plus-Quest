/**
 * Tests the text input.
 */
function test_textInput() {
    var validWords1 = Array(
        Array('pickup', 'use', 'examine'),
        Array('card', 'desk', 'HaMMeR')
    );
    var validWords2 = Array(
        Array('combine'),
        Array('match', 'matchBox'),
        Array('match', 'matchBox')
    );
    var validWords3 = Array(
        Array('combine'),
        Array('match', 'matchBox'),
        Array('match', 'matchBox', 'pillow')
    );
    var validWords4 = Array(
        Array('goto', 'exit', 'use'),
        Array('match', 'matchBox')
    );
    // Contains arrays of input and expected return values
    var testMatrix = Array(
        Array('pickup card', validWords1, Array('pickup', 'card')),
        Array('   pickup	card ', validWords1, Array('pickup', 'card')),
        Array('use card', validWords1, Array('use', 'card')),
        Array('examine desk', validWords1, Array('examine', 'desk')),
        Array('eXaminE deSk', validWords1, Array('examine', 'desk')),
        Array('uSE hammER', validWords1, Array('use', 'HaMMeR')),
        Array('pick up card', validWords1, false),
        Array('examine desks', validWords1, Array('examine', 'INVALID')),
        Array('stuff', validWords1, Array('INVALID')),
        Array('stuff', Array(), false),
        Array('combine match \t\t  matchbox', validWords2, Array('combine', 'match', 'matchBox')),
        Array('combine matchbox      pillow', validWords3, Array('combine', 'matchBox', 'pillow')),
        Array('do stuff', Array(Array(), Array()), false),
        Array('do stuff', validWords1, Array('INVALID', 'INVALID')),
        Array('exit', validWords4, Array('exit'))
    );

    for (var i=0; i<testMatrix.length; i++) {
        input = testMatrix[i][0];
        validWordsArray = testMatrix[i][1];
        expectedOutput = testMatrix[i][2];

        output = window.validateTextInput(input, validWordsArray);
        window.test(_arraysAreEqual(output, expectedOutput),
            'input: "' +input+ '", expected output: [' +expectedOutput+ '], actual output: [' +output+ ']');
    }
}

/**
 * Compares the contents of two arrays. If every element in the two arrays is
 * the same, true is returned. False otherwise.
 *
 * Zero-length arrays are considered to be equal.
 */
function _arraysAreEqual(array1, array2) {
    if (array1.length != array2.length)
        return false;

    for (var i=0; i<array1.length; i++) {
        if (array1[i] != array2[i])
            return false;
    }

    return true;
}
