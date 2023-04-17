import LoginForm from "@components/LoginForm";
import main from "@styles/pageStyles.module.css";
import { useTheme } from "@providers/ThemeProvider";
import useRedirect from "@hooks/useRedirect";

export default function SignUp() {
	useRedirect();
	const { theme } = useTheme();
	return (
		<div className={`${main.container}`}>
			<h1 className="text-center m-5">Create a new account</h1>
			<div className={`${main.loginContainer} ${main[theme]}`}>
				<LoginForm className="mb-4" action="Create Account" />
			</div>
		</div>
	);
}
