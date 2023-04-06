"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
exports.db = (0, supabase_js_1.createClient)(process.env.DB_URL, process.env.DB_PUBLIC_KEY);
//# sourceMappingURL=db.js.map