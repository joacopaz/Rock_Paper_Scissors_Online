import { CookieOptions } from "express-session";

// Cookie settings
export const cookieOptions: CookieOptions = {
	httpOnly: true,
	secure: true,
	domain: process.env.NODE_ENV === "Development" ? ".localhost" : "TBD",
	sameSite: "strict",
	signed: true,
	maxAge: 1000 * 60 * 60 * 24, // 1 day => 1000 = second * 60 = minute * 60 = hour
};
