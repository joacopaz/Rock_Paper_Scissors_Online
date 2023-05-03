import "./sockets.js";
import { NextFunction, Request, Response, Router } from "express";
import "../utils/stringVerifyMethods.js"; // extending String.prototype to include verify functions
import {
	checkUserInUse,
	checkEmailInUse,
	createUser,
} from "../utils/dbFunctions.js";
const router = Router();
import { faker } from "@faker-js/faker";

// Authentication config
import passport from "../config/passport.js";
router.use(passport.initialize());
router.use(passport.session());

/* /api endpoint configuration */

router.post("/", (req, res) => {
	console.log(req.session);
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
				user: {
					id: newUser.id,
					username: newUser.username,
					expires: req.session.cookie.expires,
				},
			});
			req.login({ id: newUser.id!, username: newUser.username }, (err) => {
				console.log(err);
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
		1;
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

router.post("/sign-guest", async (req, res) => {
	if (!req.user && !req.session.guest) {
		req.session.guest = {
			name: faker.name.firstName() + faker.name.lastName(),
		};
		return res.status(201).send({
			message: "Created new guest",
			user: {
				name: req.session.guest.name,
				id: null,
				expires: req.session.cookie.expires,
			},
		});
	}
	if (req.user)
		return res.status(200).send({
			message: `You are already logged in as ${req.user.username}`,
			user: {
				name: req.user?.username,
				id: req.user?.id,
				expires: req.session.cookie.expires,
			},
		});
	if (req.session.guest) {
		console.log(req.session);
		res.send({ message: "Already logged in as " + req.session.guest.name });
	}
});

router.post("/logout", (req, res) => {
	req.logOut((err) => {
		if (err) console.log(err);
		res.status(200).send({ message: "Successfully logged out" });
	});
});

export default router;
