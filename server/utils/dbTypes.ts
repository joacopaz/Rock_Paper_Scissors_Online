export interface JWT {
	userId: string;
	sessionId: string;
	expiresAt: number;
}

export interface User {
	id: string;
	username: string;
	password: string;
	email: string;
	createdAt: number;
	session: JWT["sessionId"];
	expiresAt: JWT["expiresAt"];
	profilePictureUrl: string;
}

export interface Round {
	id: string;
	gameId: string;
	roundNumber: number;
	playerOneChoice: string;
	playerTwoChoice: string;
	winnerId: number;
}

export interface Guest {
	id: string;
	createdAt: number;
	expiresAt: JWT["expiresAt"];
}

export interface Game {
	id: string;
	playerOneId: string;
	playerTwoId: string;
	hasStarted: boolean;
	winnerId: string;
	createdAt: number;
}
