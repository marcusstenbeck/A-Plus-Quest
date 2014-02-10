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
    if (words.length == 0) {
        return words;
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
