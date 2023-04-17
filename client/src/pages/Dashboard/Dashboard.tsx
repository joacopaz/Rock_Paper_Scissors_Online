import { useAuth } from "@providers/AuthProvider";
import main from "@styles/pageStyles.module.css";
export default function Dashboard() {
	const { user } = useAuth();
	return <div className={main.container}>Welcome {user?.name}</div>;
}
