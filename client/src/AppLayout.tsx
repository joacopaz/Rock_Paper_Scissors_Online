import ThemeProvider from "@providers/ThemeProvider";
import ToggleTheme from "@components/ToggleTheme";
import AuthProvider from "./providers/AuthProvider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<ThemeProvider>
				<ToggleTheme />
				{children}
			</ThemeProvider>
		</AuthProvider>
	);
}
