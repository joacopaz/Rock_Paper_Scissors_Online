String.prototype.isValidUsername = function (): boolean {
	// Use a regular expression to check for valid characters
	const regex = /^[a-zA-Z0-9]{4,20}$/;

	// Test the input string against the regular expression
	return regex.test(this.valueOf());
};

String.prototype.isValidPassword = function (): boolean {
	// Get the length of the input string
	const length = this.length;

	// Check if the length is between 6 and 20 characters
	return length >= 6 && length <= 20;
};

String.prototype.isValidEmail = function (): boolean {
	// Maximum length check
	if (this.length > 30) {
		return false;
	}

	// Regular expression to validate email format
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Test the input string against the regular expression
	return regex.test(this.valueOf());
};
