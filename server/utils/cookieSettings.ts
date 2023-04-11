import { CookieOptions } from "express-session";
import dotenv from "dotenv";
dotenv.config();

// Cookie settings
export const cookieOptions: CookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "Development" ? false : true,
	domain: process.env.NODE_ENV === "Development" ? ".localhost" : "TBD",
	sameSite: "strict",
	signed: true,
	maxAge: 1000 * 60 * 60 * 24, // 1 day => 1000 = second * 60 = minute * 60 = hour
};
