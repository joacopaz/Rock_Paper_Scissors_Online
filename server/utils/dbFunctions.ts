import { UUID } from "crypto";
import { db } from "../db";
import { User } from "./dbTypes";

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
