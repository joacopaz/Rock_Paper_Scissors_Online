import { SessionStrategy } from "passport";

declare global {
	interface String {
		isValidUsername(): boolean;
		isValidPassword(): boolean;
		isValidEmail(): boolean;
	}

	namespace Express {
		interface User {
			id: number;
			username: string;
		}
	}
}

declare module "express-session" {
	interface SessionData {
		guest: {
			name: string;
		};
	}
}

export {};
