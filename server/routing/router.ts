import "./sockets.js";
import {
	NextFunction,
	Request,
	RequestHandler,
	Response,
	Router,
} from "express";
import "../utils/stringVerifyMethods.js"; // extending String.prototype to include verify functions
import {
	checkUserInUse,
	checkEmailInUse,
	createUser,
	getUserById,
} from "../utils/dbFunctions.js";
const router = Router();

// Authentication config
import passport from "../config/passport.js";
router.use(passport.initialize());
router.use(passport.session());

/* /api endpoint configuration */

router.get("/", (req, res) => {
	console.log(req.user);
	console.log(req.sessionID);
	res.status(200).send({ message: "Hello World!" });
});

router.post(
	"/create-account",
	(req, res, next) => {
		if (req.user) {
			return res
				.status(200)
				.send({ message: `You are already logged in as ${req.user.username}` });
		}
		next();
	},
	async (req: Request, res: Response) => {
		const {
			username,
			password,
			email,
		}: { username: string; password: string; email: string } = req.body;
		try {
			if (!username.isValidUsername()) throw Error("Invalid Username");
			if (!password.isValidPassword()) throw Error("Invalid Password");
			if (!email.isValidEmail()) throw Error("Invalid Email");
			if (await checkEmailInUse(email)) throw Error("Email is already in use");
			if (await checkUserInUse(username))
				throw Error("Username is already in use");

			const newUser = await createUser(
				username,
				email,
				password,
				req.sessionID,
				req.session.cookie.expires!.valueOf()
			);
			if (!newUser) throw Error("Error creating user");
			res.status(201);
			res.send({
				message: "Account created successfully",
				user: { id: newUser.id, name: newUser.username },
			});
		} catch (error: any) {
			res.statusMessage = error.message;
			res.statusCode = 400;
			return res.send({ message: error.message });
		}
	}
);

router.post(
	"/login",
	async (req: Request, res: Response, next: NextFunction) => {
		console.log(req.session);

		if (req.user) {
			if (req.body.username === req.user.username)
				return res.status(200).send({
					message: `You are already logged in as ${req.user.username}`,
					user: {
						name: req.user?.username,
						id: req.user?.id,
						expires: req.session.cookie.expires,
					},
				});
		}
		next();
	},
	passport.authenticate("local"),
	(req, res) => {
		try {
			res.status(200);
			res.send({
				message: "Successfully logged in",
				user: {
					name: req.user?.username,
					id: req.user?.id,
					expires: req.session.cookie.expires,
				},
			});
		} catch (error) {
			res.send({ message: "Error logging in, please try again" });
			console.log(error);
		}
	}
);

export default router;
