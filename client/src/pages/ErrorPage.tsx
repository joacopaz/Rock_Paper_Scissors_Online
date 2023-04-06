import { getOverlayDirection } from "react-bootstrap/esm/helpers";
import kitty from "../assets/sad-kitty-error-page.png";
import happyKitty from "../assets/happy-kitty-error-page.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ErrorPage() {
	const [kittyState, setKittyState] = useState<"happy" | "sad">("sad");
	return (
		<div
			style={{
				height: "100%",
				border: "red solid",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				display: "flex",
				gap: "50px",
			}}
		>
			<h1 style={{}}>Oops! There was an error!</h1>
			<img
				src={kittyState === "happy" ? happyKitty : kitty}
				style={{ maxHeight: "200px" }}
			></img>
			<Link
				to="/"
				style={{ fontSize: "2rem" }}
				onMouseEnter={() => setKittyState("happy")}
				onMouseLeave={() => setKittyState("sad")}
			>
				Take me somewhere safe
			</Link>
		</div>
	);
}
