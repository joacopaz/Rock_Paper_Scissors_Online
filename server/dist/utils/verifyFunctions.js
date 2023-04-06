"use strict";
String.prototype.isValidUsername = function () {
    // Use a regular expression to check for valid characters
    const regex = /^[a-zA-Z0-9]{4,20}$/;
    // Test the input string against the regular expression
    return regex.test(this.valueOf());
};
String.prototype.isValidPassword = function () {
    // Get the length of the input string
    const length = this.length;
    // Check if the length is between 6 and 20 characters
    return length >= 6 && length <= 20;
};
String.prototype.isValidEmail = function () {
    // Maximum length check
    if (this.length > 20) {
        return false;
    }
    // Regular expression to validate email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Test the input string against the regular expression
    return regex.test(this.valueOf());
};
//# sourceMappingURL=verifyFunctions.js.map