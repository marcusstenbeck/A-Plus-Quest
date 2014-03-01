var autoCompleteIndex = 0; // Used when the user tabs between auto-completed words

$('document').ready(function(){
    $('input[name=textInput]').focus();
    $('input[name=textInput]').on('keydown', function(e) {
        if (e.keyCode == 9) { // 9 == TAB key
            e.preventDefault();
        } else if (e.keyCode == 13) { // 13 == ENTER key
            e.preventDefault();
            sendInput(this);
        }
    });

    $('input[name=textInput]').on('keyup', function(e) {
        if (e.keyCode == 9) { // 9 == TAB key
            autoComplete(this, this.typedChars);
        } else {
            this.typedChars = $(this).val();
            window.autoCompleteIndex = 0; // Reset when the user typed something new
        }
    });
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
 * TODO: Write a description.
 */
function sendInput(inputElement) {
    var inputField = $(inputElement);
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
 * Enables the text field if 'enable' is set to true, disables it otherwise.
 */
function enableInput(enable) {
    textInputForm.textInput.disabled = !enable;
}

/**
 * Populates the given text input element with an auto-completion of the last
 * word in the given string with words that are valid at the current location.
 * The auto-completion is currently case-sensitive. It does not complete "empty
 * words" - they have to begin with at least one letter.
 */
function autoComplete(inputElement, str) {
    var validWords = getValidWordsForCurrentLocation();
    var wordArray = _textToArray(str);
    if (wordArray.len == 0 || wordArray[0] == "") {
        return;
    }

    // Only auto-complete the last word in the input
    var needleIndex = wordArray.length - 1
    var needle = wordArray.pop(); // Remove the last one AND save it

    // If the needle is followed by whitespace, ignore it
    if (str.lastIndexOf(needle) + needle.length != str.length) {
        return;
    }

    if (needleIndex >= validWords.length) {
        return; // No more valid words left
    }

    // Add words which are candidates for this needle
    var completions = Array();
    for (var i=0; i<validWords[needleIndex].length; i++) {
        if (validWords[needleIndex][i].indexOf(needle) == 0) {
            completions.push(validWords[needleIndex][i]);
        }
    }

    if (window.autoCompleteIndex >= completions.length) {
        window.autoCompleteIndex = 0;
    }

    if (completions.length > 0) {
        // Prepend the completion with whatever was before the needle
        var pre = str.substring(0, str.lastIndexOf(needle));
        $(inputElement).val(pre + completions[window.autoCompleteIndex]);
        window.autoCompleteIndex++;
    }
}

/**
 * Returns the words that are valid to use at the current location as a
 * two-dimensional array, where the first row is valid for the first word and so
 * on.
 */
function getValidWordsForCurrentLocation() {
    var validWords = [
        ['use', 'inventory', 'intelligent', 'using', 'pickup', 'goto', 'examine', 'pixie'],
        ['office', 'outside', 'bookshelf', 'book', 'pen', 'pencil', 'hammer']
    ];
    return validWords;
}
