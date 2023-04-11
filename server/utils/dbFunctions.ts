import { db } from "../config/db.js";
import { User } from "./dbTypes.js";

export async function checkUserExists(
	username: User["username"]
): Promise<boolean> {
	const response: any = await db
		.from("users")
		.select("username")
		.eq("username", username);
	if (response.data.length > 0) return true;
	return false;
}

export function checkPassword(
	passwordToCheck: string,
	storedHash: string,
	storedSalt: string
): boolean {
	return passwordToCheck === storedHash;
}
