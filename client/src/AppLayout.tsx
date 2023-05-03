import ThemeProvider from "@providers/ThemeProvider";
import ToggleTheme from "@components/ToggleTheme";
import AuthProvider from "./providers/AuthProvider";
import main from "@styles/pageStyles.module.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<ThemeProvider>
				<ToggleTheme />
				<div className={main.container}>{children}</div>
			</ThemeProvider>
		</AuthProvider>
	);
}
