import { db } from "../config/db.js";
import bcrypt from "bcrypt";
export async function checkUserExists(username) {
    const response = await db
        .from("users")
        .select("username")
        .eq("username", username);
    if (response.data.length > 0)
        return true;
    return false;
}
export async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    catch (error) {
        console.log(error);
        return "";
    }
}
export async function checkPassword(passwordToCheck, storedHash) {
    try {
        return await bcrypt.compare(passwordToCheck, storedHash);
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
/**
 * Returns matched data from the db
 * @param {string} table - The name of the table.
 * @param {string} columns - Column or columns to return, comma separated values.
 *@param {string} query - Query object to match, for example {name: "John", id: 1}
 * @returns {Array} The results.
 */
export async function useDb(table, columns, query) {
    const { data, error } = await db.from(table).select(columns).match(query);
    if (error) {
        console.log(error);
        return false;
    }
    if (data.length === 0)
        return false;
    if (data)
        return data;
    return false;
}
//# sourceMappingURL=dbFunctions.js.map