import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { db } from "./db.js";
import { checkPassword, useDb } from "../utils/dbFunctions.js";

const verifyCallback: VerifyFunction = async (username, password, done) => {
	try {
		const data = await useDb("users", "username, hash", {
			username: username,
		});
		if (!data) return done(null, false);
		const storedUser = data[0]?.username;
		const storedHash = data[0]?.hash;
		if (!storedUser || !storedHash) return done(null, false);
		if (await checkPassword(password, storedHash)) return done(null, storedUser);
		return done(null, false);
	} catch (error) {
		return done(error);
	}
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

export default passport;
