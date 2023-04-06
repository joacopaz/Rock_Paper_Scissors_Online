import { useTheme } from "@providers/ThemeProvider";
import styles from "@styles/landing.module.css";

export default function ToggleTheme() {
	const { toggleTheme, theme } = useTheme();
	return (
		<div className={styles.toggleContainer} onClick={toggleTheme}>
			{/* {theme.charAt(0).toUpperCase() + theme.substring(1)} */}
			<button className={`${theme} ${styles.toggle}`}></button>
		</div>
	);
}
