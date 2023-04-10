// Cookie settings
export const cookieOptions = {
    httpOnly: true,
    secure: true,
    domain: process.env.NODE_ENV === "Development" ? ".localhost" : "TBD",
    sameSite: "strict",
    signed: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day => 1000 = second * 60 = minute * 60 = hour
};
//# sourceMappingURL=cookieSettings.js.map