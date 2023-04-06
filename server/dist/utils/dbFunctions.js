"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserExists = void 0;
const db_1 = require("../db");
async function checkUserExists(username) {
    const response = await db_1.db
        .from("users")
        .select("username")
        .eq("username", username);
    if (response.data.length > 0)
        return true;
    return false;
}
exports.checkUserExists = checkUserExists;
//# sourceMappingURL=dbFunctions.js.map