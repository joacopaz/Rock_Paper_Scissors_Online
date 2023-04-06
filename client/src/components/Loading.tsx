import { Spinner } from "react-bootstrap";

export default function Loading() {
	return (
		<div
			style={{
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</div>
	);
}
