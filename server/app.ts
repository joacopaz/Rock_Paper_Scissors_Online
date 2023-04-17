import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "http";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import router from "./routing/router.js";
import session from "express-session";
import pg from "pg";
import connectPg from "connect-pg-simple";
import { cookieOptions } from "./utils/cookieSettings.js";
import formatter from "./utils/dateformatter.js";

// Creating App
const app = express();
const server = createServer(app);

// Mounting MW
app.use(helmet());

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: "GET, POST, PUT, DELETE",
		credentials: true,
	})
);

// Setting up store for sessions
const pgStore = connectPg(session);

const pgPool = new pg.Pool({
	connectionString: `postgres://postgres:${process.env.DB_PASS}@db.efkcvidvtxfdkdoyojql.supabase.co:6543/postgres`,
});

app.use(
	session({
		store: new pgStore({
			pool: pgPool, // Connection pool
			tableName: "sessions", // Use another table-name than the default "session" one
			createTableIfMissing: true,
			errorLog: (err) => console.log(err),
			pruneSessionInterval: 60, // Prune expired entries every 60 seconds
		}),
		secret: process.env.COOKIE_SECRET!,
		resave: false,
		cookie: cookieOptions, // live for 1 day
		saveUninitialized: false,
	})
);

// Force origin header on requests
app.use((req, res, next) => {
	if (!req.headers.origin && req.method !== "GET") {
		console.log("Missing origin");
		return res.sendStatus(400);
	}
	// Handling CORP policy
	res.setHeader("Cross-Origin-Resource-Policy", "same-site");
	next();
});

// Rate limiting
app.use(
	rateLimit({
		windowMs: 60000,
		max: 20, // 20 requests per minute
	})
);

app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
	const ip = req.headers["x-forwarded-for"] || req.ip;
	console.log(
		`${req.method} Request received from session ${
			req.sessionID
		} ${formatter.format(new Date())} @ ${ip}`
	);
	next();
});

app.use("/api", router);

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log(`Server listening on port ${port}...`);
	console.log("Client running on http://localhost:5173...");
});
