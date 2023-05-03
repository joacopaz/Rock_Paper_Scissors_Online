import useFetch from "@hooks/useFetch";
import React, { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface UserObject {
	name: string;
	id: number;
	expires: Date;
}

interface AuthContext {
	user: UserObject | null;
	login(username: string, password: string): void;
	logout(): void;
	logGuest(): void;
	createAccount(username: string, password: string, email: string): void;
	loading: boolean;
	error: string;
	success: string;
	cleanMessages(): void;
}

const UserContext = React.createContext<AuthContext>({
	user: null,
	login: () => {},
	logout: () => {},
	logGuest: () => {},
	createAccount: () => {},
	cleanMessages: () => {},
	loading: false,
	error: "",
	success: "",
});

export default function AuthProvider({ children }: { children: ReactNode }) {
	const { myFetch, fetching, error, success, setError, setSuccess } =
		useFetch();

	const [user, setUser] = React.useState<UserObject | null>(() => {
		const userFromLocalStorage = JSON.parse(localStorage.getItem("user")!);
		if (
			userFromLocalStorage &&
			new Date(userFromLocalStorage.expires) > new Date()
		) {
			return userFromLocalStorage;
		} else {
			localStorage.removeItem("user");
			return null;
		}
	});

	const createAccount = async (
		username: string,
		password: string,
		email: string
	) => {
		const data: {
			user: { id: number; username: string; expires: Date };
		} = await myFetch(`/api/create-account`, "POST", {
			username,
			password,
			email,
		});
		if (data?.user) {
			localStorage.setItem("user", JSON.stringify(data.user));
			setUser({
				name: data.user.username,
				id: data.user.id,
				expires: data.user.expires,
			});
		}
	};

	const login = async (username: string, password: string) => {
		const loginData = await myFetch(`/api/login`, "POST", {
			username,
			password,
		});
		if (loginData?.user) {
			localStorage.setItem(
				"user",
				JSON.stringify({
					name: loginData.user.name,
					id: loginData.user.id,
					expires: loginData.user.expires,
				})
			);
			setUser(loginData.user);
		}
	};

	const logGuest = async () => {
		if (user) return setSuccess(`Already logged in as ${user.name}`);
		const response = await myFetch("/api/sign-guest", "POST");
		if (response.user) {
			localStorage.setItem("user", JSON.stringify(response.user));
			setUser(response.user);
		}
	};

	const logout = async () => {
		await myFetch("/api/logout", "POST");
		localStorage.removeItem("user");
		setUser(null);
	};

	const cleanMessages = () => {
		setError("");
		setSuccess("");
	};

	const value = {
		user,
		login,
		logout,
		loading: fetching,
		logGuest,
		createAccount,
		error,
		success,
		cleanMessages,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useAuth = () => React.useContext(UserContext);
