import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { checkPassword, getUserById, useDb } from "../utils/dbFunctions.js";

const verifyCallback: VerifyFunction = async (username, password, done) => {
	try {
		const data = await useDb("users", "username, hash, id", {
			username: username,
		});
		if (!data) return done(null, false);
		const user = data[0];

		const storedUser = user.username;
		const storedHash = user.hash;
		if (!storedUser || !storedHash) return done(null, false);
		if (await checkPassword(password, storedHash)) return done(null, user);
		return done(null, false);
	} catch (error) {
		return done(error);
	}
};

const strategy = new LocalStrategy(verifyCallback);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
	try {
		const user = await getUserById(id);
		done(null, user);
	} catch (error) {
		done(error);
	}
});

passport.use(strategy);

export default passport;
