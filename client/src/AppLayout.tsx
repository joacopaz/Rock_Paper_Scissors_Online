import ThemeProvider from "@providers/ThemeProvider";
import ToggleTheme from "@components/ToggleTheme";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider>
			<ToggleTheme />
			{children}
		</ThemeProvider>
	);
}
