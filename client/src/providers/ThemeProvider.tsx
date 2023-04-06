import { createContext, useState, useContext, useEffect, useRef } from "react";

export const ThemeContext = createContext({});

type Theme = "dark" | "light";

interface useTheme {
	toggleTheme: () => void;
	theme: Theme;
}

export default function ThemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const mainRef = useRef<any>();

	const [theme, setTheme] = useState<Theme>(
		(localStorage.getItem("theme") as Theme) || "light"
	);

	const toggleTheme = (): void => {
		theme === "dark" ? setTheme("light") : setTheme("dark");
		typeof window !== "undefined"
			? window.localStorage.setItem(
					"theme",
					theme === "dark" ? "light" : "dark"
			  )
			: null;
	};
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<main className={theme} ref={mainRef}>
				{children}
			</main>
		</ThemeContext.Provider>
	);
}

export const useTheme = () => useContext(ThemeContext) as useTheme;
