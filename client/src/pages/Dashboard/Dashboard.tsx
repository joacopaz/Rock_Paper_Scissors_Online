import useRedirect from "@hooks/useRedirect";
import { useAuth } from "@providers/AuthProvider";
import main from "@styles/pageStyles.module.css";
import styles from "@styles/dashboard.module.css";
import { Spinner } from "react-bootstrap";
import { useTheme } from "@providers/ThemeProvider";
export default function Dashboard() {
	useRedirect();
	const { user, logout, loading } = useAuth();
	return (
		<>
			<div>Welcome {user?.name}</div>
			<a className={styles.logoutBtn}>
				{loading ? (
					<Spinner
						as="span"
						animation="border"
						role="status"
						aria-hidden="true"
						style={{ width: "25px", height: "25px" }}
					/>
				) : (
					<span onClick={logout}>Log out</span>
				)}
			</a>
		</>
	);
}
