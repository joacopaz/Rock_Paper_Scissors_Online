declare global {
	interface String {
		isValidUsername(): boolean;
		isValidPassword(): boolean;
		isValidEmail(): boolean;
	}
}

export {};
