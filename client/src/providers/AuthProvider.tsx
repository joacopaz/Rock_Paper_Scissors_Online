import React, { ReactNode } from "react";

interface UserObject {
	name: string;
	id: number;
	expires: Date;
}

interface AuthContext {
	user: UserObject | null;
	clientLogin(user: UserObject): void;
	clientLogout(): void;
}

const UserContext = React.createContext<AuthContext>({
	user: null,
	clientLogin: () => {},
	clientLogout: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
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

	const clientLogin = (user: UserObject) => {
		localStorage.setItem("user", JSON.stringify(user));
		setUser(user);
	};

	const clientLogout = () => {
		localStorage.removeItem("user");
		setUser(null);
	};

	const value = { user, clientLogin, clientLogout };

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useAuth = () => React.useContext(UserContext);
