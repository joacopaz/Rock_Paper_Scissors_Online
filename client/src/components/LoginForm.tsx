import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import {
	FormEvent,
	ChangeEvent,
	useState,
	ClassAttributes,
	useEffect,
} from "react";
import { useTheme } from "@providers/ThemeProvider";
import styles from "@styles/landing.module.css";
import { useAuth } from "@providers/AuthProvider";

export default function LoginForm({
	className,
	action,
}: {
	className?: string;
	action: string;
}) {
	const { theme } = useTheme();
	const { login, createAccount, error, success, loading, cleanMessages } =
		useAuth();

	useEffect(() => cleanMessages(), []);

	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		switch (action) {
			case "Create Account":
				createAccount(user, pass, email);
				break;
			case "Login":
				login(user, pass);
			default:
				break;
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const wordRegex = /^[a-zA-Z0-9]+$/;
		const { data } = e.nativeEvent as InputEvent;
		if (data && !wordRegex.test(data)) return;
		setUser(e.target.value);
	};
	const onChangePass = (e: ChangeEvent<HTMLInputElement>) => {
		setPass(e.target.value);
	};
	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	return (
		<>
			<Form
				onSubmit={handleSubmit}
				style={{ caretColor: "auto" }}
				className={className}
			>
				<Form.Group controlId="formName" className="mb-4">
					<Form.Label className="text-center w-100 ">Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your name"
						autoComplete="off"
						onChange={onChange}
						value={user}
						maxLength={20}
						minLength={4}
						required
						className={`${styles.formControl} ${styles[theme]}`}
					/>
				</Form.Group>

				<Form.Group controlId="formPassword" className="mb-4">
					<Form.Label className="text-center w-100">Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						maxLength={20}
						minLength={6}
						onChange={onChangePass}
						required
						className={`${styles.formControl} ${styles[theme]}`}
						autoComplete="off"
						value={pass}
					/>
				</Form.Group>
				{action === "Create Account" ? (
					<>
						<Form.Group
							controlId="formEmail"
							className="mb-4"
							style={{ maxWidth: "200px" }}
						>
							<Form.Label
								className="text-center w-100 "
								style={{ marginBottom: 0 }}
							>
								E-mail
							</Form.Label>
							<div
								style={{
									fontSize: "0.9rem",
									width: "100%",
									textAlign: "center",
								}}
							>
								Used for recover and confirm
							</div>
							<Form.Control
								type="email"
								placeholder="Enter email"
								pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
								maxLength={30}
								onChange={onChangeEmail}
								value={email}
								className={`${styles.formControl} ${styles[theme]}`}
								autoComplete="off"
								required
							/>
						</Form.Group>
					</>
				) : null}

				<div
					style={{ display: "flex", justifyContent: "center" }}
					className="mt-5"
				>
					<Button
						variant="primary"
						type="submit"
						disabled={loading}
						style={{
							fontSize: "1.3em",
							padding: ".1em .5em",
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							minHeight: "50px",
						}}
						className={`${styles.submitBtn} ${styles[theme]}`}
					>
						{!loading ? (
							action
						) : (
							<Spinner
								as="span"
								animation="border"
								role="status"
								aria-hidden="true"
								style={{ width: "25px", height: "25px" }}
							/>
						)}
					</Button>
				</div>
			</Form>
			{error ? (
				<Alert
					className="text-center"
					style={{ fontFamily: "var(--font3)", fontSize: "0.9rem" }}
					variant="danger"
				>
					{error}
				</Alert>
			) : null}
			{success ? (
				<Alert
					className="text-center"
					style={{ fontFamily: "var(--font3)", fontSize: "0.9rem" }}
					variant="success"
				>
					{success}
				</Alert>
			) : null}
		</>
	);
}
