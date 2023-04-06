"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Formatter
const options = {
    hour12: true,
    hourCycle: "h12",
    formatMatcher: "best fit",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
};
exports.default = new Intl.DateTimeFormat(undefined, options);
//# sourceMappingURL=dateformatter.js.map