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
export default new Intl.DateTimeFormat(undefined, options as any);
