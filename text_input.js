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
 */
function validateTextInput(str, validWordsArray) {
    words = _textToArray(str);

    // If nothing was written, just return the empty array
    if (words.length == 0) {
        return words;
    }

    // The number of words must match the number of rows
    if (validWordsArray.length != words.length) {
        return false;
    }

    // Do some type of sanity check of the word array
    if (validWordsArray.length == 0) {
        console.error('At least one valid word is required.');
        return false;
    }

    // Go through the list of words and see if they are valid
    for (var row=0; row<validWordsArray.length; row++) {
        for (var col=0; col<validWordsArray[row].length; col++) {
            validWord = validWordsArray[row][col];
            if (words[row].toLowerCase() == validWord.toLowerCase()) {
                words[row] = validWord; // Copy the valid word
                break; // Break the inner loop
            }

            // Last word but still no match
            if (col == (validWordsArray[row].length - 1)) {
                return false;
            }
        }
    }

    // Everything seems valid, return the array
    return words;
}

/**
 * Trims away any leading and trailing whitespace and returns an Array of the
 * separated words. If the string is empty, an empty Array is returned.
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
