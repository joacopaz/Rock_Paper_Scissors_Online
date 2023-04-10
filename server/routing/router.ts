import { CookieOptions, Router } from "express";
import formatter from "../utils/dateformatter.js";
require("./sockets");
import { db } from "../db";
const cookieParser = require("cookie-parser");
import "../utils/stringVerifyMethods"; // extending String.prototype to include verify functions
import { checkUserExists } from "../utils/dbFunctions.js";

// /api endpoint configuration

const router = Router();

const key = crypto.randomUUID();

router.use(cookieParser(key));

router.use((req, res, next) => {
	const ip = req.headers["x-forwarded-for"] || req.ip;
	console.log(
		`${req.method} Request received ${formatter.format(new Date())} @ ${ip}`
	);
	next();
});

const cookieOptions: CookieOptions = {
	httpOnly: true,
	secure: true,
	domain: process.env.NODE_ENV === "Development" ? ".localhost" : "TBD",
	sameSite: "strict",
	signed: true,
	maxAge: 1000 * 60 * 60, // 1 hour => 1000 = second * 60 = minute * 60 = hour
};

router.get("/", async (req, res) => {
	// const { data, error } = await db.from("users").select("*");
	// res.send({ data });
});

router.post("/create-account", async (req, res) => {
	const { user, pass, email }: { user: string; pass: string; email: string } =
		req.body;
	try {
		if (!user.isValidUsername()) throw Error("Invalid Username");
		if (!pass.isValidPassword()) throw Error("Invalid Password");
		if (!email.isValidEmail()) throw Error("Invalid Email");
		if (await checkUserExists(user)) throw Error("Username is already in use");
	} catch (error: any) {
		res.statusMessage = error.message;
		res.statusCode = 400;
		return res.send({ error: error.message });
	}
	res.sendStatus(200);
});

module.exports = router;

/* Notes

DB usage
const { data, error } = await db.from("users").select("*");

To retrieve cookies use req.signedCookies instead of req.cookies

Sample of setting cookie
const val = crypto.randomUUID();
res.status(201);
res.cookie("Token", val, cookieOptions);
res.send({ result: "Cookie Set", token: val });

*/
