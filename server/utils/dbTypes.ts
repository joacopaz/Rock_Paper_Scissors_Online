export interface User {
	id?: number; // assigns automatically
	username: string;
	hash: string;
	email: string;
	created_at: number;
	session: string;
	expires_at: number;
	profilePictureUrl?: string;
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
	expiresAt: number;
}

export interface Game {
	id: string;
	playerOneId: string;
	playerTwoId: string;
	hasStarted: boolean;
	winnerId: string;
	createdAt: number;
}
