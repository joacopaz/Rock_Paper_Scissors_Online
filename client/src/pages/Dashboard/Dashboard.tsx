import useFetch from "@hooks/useFetch";
import useRedirect from "@hooks/useRedirect";
import { useAuth } from "@providers/AuthProvider";
import styles from "@styles/dashboard.module.css";
import { Button, Spinner } from "react-bootstrap";
export default function Dashboard() {
	useRedirect();
	const { user, logout, loading } = useAuth();

	return (
		<>
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
			<div>Welcome {user?.name}</div>
		</>
	);
}

// const { myFetch, fetching } = useFetch();

// const whoAmIQuery = async () => {
// 	const result = await myFetch("/api/whoami", "POST");
// 	console.log(result);
// };

/* <Button onClick={whoAmIQuery}>
	{fetching ? "Fetching..." : "Who am I?"}
</Button> */
