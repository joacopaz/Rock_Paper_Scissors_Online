import { Router } from "express";
import formatter from "../utils/dateformatter.js";
import "./sockets.js";
import cookieParser from "cookie-parser";
import "../utils/stringVerifyMethods.js"; // extending String.prototype to include verify functions
import { checkUserExists } from "../utils/dbFunctions.js";
// /api endpoint configuration
const router = Router();
const key = crypto.randomUUID();
router.use(cookieParser(key));
router.use((req, res, next) => {
    const ip = req.headers["x-forwarded-for"] || req.ip;
    console.log(`${req.method} Request received ${formatter.format(new Date())} @ ${ip}`);
    next();
});
const cookieOptions = {
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
    const { user, pass, email } = req.body;
    try {
        if (!user.isValidUsername())
            throw Error("Invalid Username");
        if (!pass.isValidPassword())
            throw Error("Invalid Password");
        if (!email.isValidEmail())
            throw Error("Invalid Email");
        if (await checkUserExists(user))
            throw Error("Username is already in use");
    }
    catch (error) {
        res.statusMessage = error.message;
        res.statusCode = 400;
        return res.send({ error: error.message });
    }
    res.sendStatus(200);
});
export default router;
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
//# sourceMappingURL=router.js.map