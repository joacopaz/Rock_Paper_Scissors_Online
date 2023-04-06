import { Server } from "socket.io";

const io = new Server(3000, { cors: { origin: ["http://localhost:5173"] } });
console.log("Socket listening on port 3000...");

io.use((socket, next) => {
	if (socket.handshake.auth.token) {
		// Perform authentication process
		next();
	} else {
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