"use strict";
/**
 * Retrieves all input elements of type "text" from the current document.
 * @returns {NodeListOf<HTMLInputElement>} A NodeList containing all input elements of type "text".
 */
function getAllInputTextElements() {
    return document.querySelectorAll('input[type="text"]');
}
/**
 * Updates the placeholders of input elements based on the value of a data attribute.
 * @param {NodeListOf<HTMLInputElement>} inputElements - The input elements to update.
 * @returns {void}
 */
function updatePlaceholders(inputElements) {
    inputElements.forEach(function (inputElement) {
        var dataAttribute = inputElement.getAttribute('data-schema-rio');
        if (dataAttribute !== null) {
            inputElement.placeholder = dataAttribute;
        }
    });
}
/**
 * Handles input events for a list of HTML input elements based on a specified pattern.
 * The pattern is defined using the 'data-schema-rio' attribute on each input element.
 * The function enforces the pattern by allowing only certain types of characters as input.
 * If the pattern attribute is not set, the input element is skipped.
 *
 * @param {NodeListOf<HTMLInputElement>} nodes - The list of HTML input elements to handle input for.
 * @returns {void}
 */
function handleInput(nodes) {
    // FIXME: If the last character is neither a letter from the alphabet nor a digit from 0 to 9, the script will enter an infinite loop.
    // FIXME: It seems that only Latin characters are accepted. The script must accept all Unicode characters.
    nodes.forEach(function (input) {
        var pattern = input.getAttribute('data-schema-rio');
        if (!pattern)
            return; // If pattern attribute is not set, skip this input
        input.addEventListener('input', function (event) {
            var target = event.target;
            var inputValue = target.value;
            var patternIndex = inputValue.length % pattern.length;
            var currentPatternChar = pattern[patternIndex];
            var nextPatternIndex = patternIndex + 1;
            var copiedChars = '';
            if (inputValue.length === pattern.length) {
                // If the length of input value matches the pattern length, disable further input
                target.blur();
                return;
            }
            while (pattern[nextPatternIndex] !== 'a' &&
                pattern[nextPatternIndex] !== '9') {
                copiedChars += pattern[nextPatternIndex];
                nextPatternIndex = (nextPatternIndex + 1) % pattern.length;
            }
            var inputChar = inputValue.charAt(inputValue.length - 1);
            if (currentPatternChar === 'a') {
                // Only allow alphabetical letters
                if (!/[a-zA-Z]/.test(inputChar)) {
                    // If input character is not alphabetical, remove it
                    target.value = inputValue.slice(0, -1);
                }
            }
            else if (currentPatternChar === '9') {
                // Only allow digits from 0 to 9
                if (!/^\d$/.test(inputChar)) {
                    // If input character is not a digit, remove it
                    target.value = inputValue.slice(0, -1);
                }
            }
            else {
                // Copy the characters from the pattern to the input's value
                target.value += currentPatternChar + copiedChars;
            }
        });
        input.addEventListener('focus', function (event) {
            var target = event.target;
            var inputValue = target.value;
            var firstPatternChar = pattern[0];
            if (firstPatternChar !== 'a' && firstPatternChar !== '9') {
                // If the first character in the pattern is not 'a' or '9', copy it to the input's value
                target.value = firstPatternChar;
            }
        });
    });
}
/**
 * Executes the schema-rio functionality by retrieving all input text elements,
 * updating their placeholders, and handling input events based on specified patterns.
 *
 * @returns {void}
 */
function runSchemario() {
    var inputElements = getAllInputTextElements();
    updatePlaceholders(inputElements);
    handleInput(inputElements);
}
/**
 * Adds an event listener to the 'DOMContentLoaded' event of the document,
 * which triggers the specified function once the DOM content is fully loaded.
 * The function 'runSchemario' will be invoked when the DOM content is ready.
 *
 * @param {'DOMContentLoaded'} type - The event type to listen for, in this case, 'DOMContentLoaded'.
 * @param {EventListenerOrEventListenerObject} listener - The event listener function or object to be called when the event is triggered.
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', runSchemario);
