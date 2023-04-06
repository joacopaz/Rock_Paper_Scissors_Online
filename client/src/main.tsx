import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/Landing/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import AppLayout from "./AppLayout";
import ErrorPage from "./pages/ErrorPage";
import BackButton from "./components/BackButton";
import Connect from "./components/Connect";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<App />
			</>
		),
		errorElement: (
			<>
				<BackButton />
				<ErrorPage />
			</>
		),
	},
	{
		path: "/sign-up",
		element: (
			<>
				<BackButton />
				<SignUp />
			</>
		),
	},
	{
		path: "/sign-guest",
		element: (
			<div
				style={{
					display: "flex",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<BackButton />
				TBD - Create a SignGuest component and attach it to the /signGuest
				endpoint @ main.tsx
			</div>
		),
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<AppLayout>
			<Connect />
			<RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
		</AppLayout>
	</React.StrictMode>
);
