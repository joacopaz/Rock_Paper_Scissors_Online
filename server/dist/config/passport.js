import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { db } from "./db.js";
import { checkPassword } from "../utils/dbFunctions.js";
const verifyCallback = async (username, password, done) => {
    try {
        const { data } = await db
            .from("users")
            .select("username, hash, salt")
            .eq("username", username);
        const storedUser = data[0]?.username;
        const storedHash = data[0]?.hash;
        const storedSalt = data[0]?.salt;
        if (!storedUser || !storedHash || !storedSalt)
            return done(null, false);
        if (checkPassword(password, storedHash, storedSalt))
            return done(null, storedUser);
        return done(null, false);
    }
    catch (error) {
        return done(error);
    }
};
const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);
export default passport;
//# sourceMappingURL=passport.js.map