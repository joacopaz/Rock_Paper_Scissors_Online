"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(3000, { cors: { origin: ["http://localhost:5173"] } });
console.log("Socket listening on port 3000...");
io.use((socket, next) => {
    if (socket.handshake.auth.token) {
        // Perform authentication process
        next();
    }
    else {
        const err = `Rejected ${socket.id} Reason: Auth failed`;
        console.log(err);
        next(Error(err));
    }
});
io.on("connect", (socket) => {
    socket.emit("log", "Connection established");
    console.log(`New connection from ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`${socket.id} has disconnected`);
    });
});
//# sourceMappingURL=sockets.js.map