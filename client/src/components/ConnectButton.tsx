import { useState } from "react";
import { Socket, io } from "socket.io-client";

export default function ConnectButton() {
	const [socket, setSocket] = useState<Socket | null>(null);

	const connect = async () => {
		const socket = io("localhost:3000", { auth: { token: "Test" } });
		socket.on("connect_error", (error) => {
			console.log(error.message);
		});
		socket.on("connect", () => {
			setSocket(socket);
			socket.on("log", (message) => console.log(message));
			socket.on("disconnect", () => {
				setSocket(null);
			});
		});
	};
	const disconnect = () => {
		socket?.disconnect(), console.log("Connection ended");
	};
	return (
		<button
			className="position-absolute"
			style={{ left: "1rem", top: "1rem", width: "200px" }}
			onClick={!socket ? connect : disconnect}
		>
			{!socket ? "Connect to socket.io" : "Disconnect"}
		</button>
	);
}
