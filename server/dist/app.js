import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "http";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import router from "./routing/router.js";
// Creating App
const app = express();
const server = createServer(app);
// Mounting MW
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}));
// Check for origin header
app.use((req, res, next) => {
    if (!req.headers.origin)
        return res.sendStatus(400);
    // Handling CORP policy
    res.setHeader("Cross-Origin-Resource-Policy", "same-site");
    next();
});
app.use(rateLimit({
    windowMs: 60000,
    max: 20, // 20 requests per minute
}));
app.use(express.json());
app.use("/api", router);
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
    console.log("Client running on http://localhost:5173...");
});
//# sourceMappingURL=app.js.map