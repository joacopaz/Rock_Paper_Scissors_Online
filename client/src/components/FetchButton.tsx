import { Http2ServerRequest } from "http2";

export default function FetchButton({
	endpoint,
	method,
	cb,
}: {
	endpoint: string;
	method: "GET" | "PUT" | "DELETE" | "POST";
	cb?: CallableFunction;
}) {
	const setCookie = async () => {
		try {
			const response = await fetch(endpoint, {
				method,
				credentials: "include",
			}); // must include credentials for cookies to be set
			if (!response.ok) throw new Error(response.statusText);
			const result = await response.json();
			console.log(result);
		} catch (error: any) {
			console.log("Error:", error.message);
		}
	};

	return (
		<button
			className="position-absolute"
			style={{ left: "1rem", top: "3rem", width: "200px" }}
			onClick={setCookie}
		>
			Run {method} fetch
		</button>
	);
}
