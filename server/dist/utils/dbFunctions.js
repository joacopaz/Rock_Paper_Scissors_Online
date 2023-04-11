import { db } from "../config/db.js";
export async function checkUserExists(username) {
    const response = await db
        .from("users")
        .select("username")
        .eq("username", username);
    if (response.data.length > 0)
        return true;
    return false;
}
export function checkPassword(passwordToCheck, storedHash, storedSalt) {
    return passwordToCheck === storedHash;
}
//# sourceMappingURL=dbFunctions.js.map