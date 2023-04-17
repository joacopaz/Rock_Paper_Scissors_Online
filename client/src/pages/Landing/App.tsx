import main from "@styles/pageStyles.module.css";
import LoginForm from "@components/LoginForm";
import { Link } from "react-router-dom";
import { useTheme } from "@providers/ThemeProvider";
import useRedirect from "@hooks/useRedirect";

export default function Landing() {
	useRedirect();
	const { theme } = useTheme();

	return (
		<div className={main.container}>
			<h1 className="m-5">Rock Papers Scissors Online</h1>
			<div className={`${main.loginContainer} ${main[theme]}`}>
				<LoginForm className="mb-4" action="Login" />
				<p className="p-2 text-center">
					Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
				</p>
				<p className="p-2 text-center">
					Or login as a <Link to="/sign-guest">Guest</Link>
				</p>
			</div>
		</div>
	);
}
