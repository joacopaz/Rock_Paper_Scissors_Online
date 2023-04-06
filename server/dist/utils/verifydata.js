"use strict";
function isValidUsername(str) {
    // Use a regular expression to check for valid characters
    const regex = /^[a-zA-Z0-9]{4,20}$/;
    // Test the input string against the regular expression
    return regex.test(str);
}
function isValidPassword(str) {
    // Get the length of the input string
    const length = str.length;
    // Check if the length is between 6 and 20 characters
    return length >= 6 && length <= 20;
}
//# sourceMappingURL=verifydata.js.map