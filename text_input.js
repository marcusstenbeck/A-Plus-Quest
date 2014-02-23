$('document').ready(function(){
    //$('#input').find('form').on('submit', sendInput);
    $('#input').find('form').submit(sendInput); // Might cope better with "return false"(?)
    $('input[name=textInput]').focus();
});

/**
 * Validates the text input and compares to the valid values. Returns the text
 * commands as an array if valid, otherwise False is returned. If the string is
 * empty, an empty Array is returned.
 *
 * The returned words will be exact copies of the strings inside the array of
 * valid words. All comparisons are case-insensitive.
 *
 *   str: the text input to be validated.
 *   validWordsArray: an NxM sized array where the first row contains an array
 *                    of words that are valid for the first word. The second row
 *                    for the second word, and so on.
 *
 * If the number of written words are fewer than the valid words (words < N),
 * only the number of written words will be returned. But if there are more
 * written words than what is allowed (words > N), false is returned.
 *
 * If a word is not valid, it will be replaced by the string 'INVALID'. This
 * results in the number of returned words always being the same as the number
 * of written words.
 */
function validateTextInput(str, validWordsArray) {
    words = _textToArray(str);
    var returnWords = Array();

    // If nothing was written, just return the empty array
    if (words.length == 0
            || (words.length == 1 && words[0] == "")) {
        return returnWords;
    }

    // The number of words must nut be greater than the number of rows
    if (words.length > validWordsArray.length) {
        return false;
    }

    // Go through the list of words and see if they are valid
    for (var row=0; row<words.length; row++) {
        // Some more sanity check
        if (validWordsArray[row].length == 0) {
            console.error('Empty arrays are not allowed.');
            return false;
        }

        for (var col=0; col<validWordsArray[row].length; col++) {
            validWord = validWordsArray[row][col];
            if (words[row].toLowerCase() == validWord.toLowerCase()) {
                returnWords.push(validWord);
                break; // Break the inner loop
            }

            // Last word but still no match
            if (col == (validWordsArray[row].length - 1)) {
                returnWords.push('INVALID');
                //return false;
            }
        }
    }

    // Everything seems valid, return the array
    return returnWords;
}

/**
 * Trims away any leading and trailing whitespace and returns an Array of the
 * separated words. If the string is empty, an empty Array is returned (which
 * has one element with the string "").
 *
 * Is also able to handle multiple whitespace within the string.
 *
 *   str: the string to chop up word by word.
 */
function _textToArray(str) {
    str = str.trim();

    // Replace multiple whitespaces with only one space
    str = str.replace(/\s+/g, ' ');

    // Return the array of words
    return str.split(" ");
}

/**
 * Sets up the input text field for registering actions.
 */
function setup_OLD() {
    if (textInputForm.addEventListener) {
        textInputForm.addEventListener('submit', sendInput);
    } else if (textInputForm.attachEvent) {
        textInputForm.attachEvent('onsubmit', sendInput);
        alert('You seem to be using IE < 9. No worries, we can handle it!');
    } else {
        alert("No support for attaching the submit-event... We can't help you with that.");
    }
}

/**
 * Sends the user-input to the game engine.
 */
function sendInput_OLD(e) {
    enableInput(false);
    e = preventFormSubmit(e);
    if (window.gameEngine) {
        window.gameEngine.performAction(textInputForm.textInput.value);
    } else {
        alert('No game engine available, but you wrote:\n'
            +textInputForm.textInput.value+ '\nConverted to:\n'
            +window.validateTextInput(textInputForm.textInput.value,
                Array(Array('goto'), Array('goto'), Array('goto'))
            )
        );
    }
    textInputForm.textInput.value = '';
    enableInput(true);
}
function sendInput(e) {
    var inputField = $('input[name=textInput]');
    inputField.prop('disabled', true);
    if (window.gameEngine) {
        window.gameEngine.performAction(inputField.val());
    } else {
        alert('No game engine available, but you wrote:\n'
            +textInputForm.textInput.value+ '\nConverted to:\n'
            +window.validateTextInput(textInputForm.textInput.value,
                Array(Array('goto'), Array('goto'), Array('goto'))
            )
        );
    }
    inputField.val('');
    inputField.prop('disabled', false);
    inputField.focus();
    return false; // Prevent submit
}

/**
 * Prevents a form from being submitted. Also supports Internet Explorer 8 and
 * older.
 */
function preventFormSubmit_OLD(e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else if (textInputForm.attachEvent) { // Avoid using event.returnResult, since it may be false
        event.returnValue = false; // And yes, "event", not "e"...
    } else {
        alert('Unable to prevent submit, due to lack of JavaScript support.');
    }

    return e;
}

/**
 * Enables the text field if 'enable' is set to true, disables it otherwise.
 */
function enableInput(enable) {
    textInputForm.textInput.disabled = !enable;
}
