"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv").config();
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
console.clear();
// Creating App
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
// Mounting MW
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
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
app.use((0, express_rate_limit_1.default)({
    windowMs: 60000,
    max: 20, // 20 requests per minute
}));
app.use(express_1.default.json());
const router = require("./routing/router");
app.use("/api", router);
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
//# sourceMappingURL=app.js.map