import { useState } from "react";

export default function useFetch() {
	const [fetching, setFetching] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [response, setResponse] = useState(null);

	const myFetch = async (url: string, method: string, body?: object) => {
		setError("");
		setSuccess("");
		setFetching(true);
		try {
			let response: any;
			response = await fetch(url, {
				method,
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			if (!response.ok) {
				if (response.status === 401)
					response.message = "Invalid username or password";
				return (
					setError(response.message || response.statusText), setFetching(false)
				);
			}
			const jsonResponse = await response.json();
			setSuccess(jsonResponse.message);
			setResponse(jsonResponse);
			console.log(jsonResponse);
			setFetching(false);
			return jsonResponse;
		} catch (error: any) {
			setError(error.message);
			setFetching(false);
		}
	};

	return { fetching, error, success, response, myFetch, setError, setSuccess };
}
