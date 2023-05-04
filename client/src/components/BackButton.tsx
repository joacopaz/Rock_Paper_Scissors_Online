import { useNavigate } from "react-router-dom";
import { useTheme } from "@providers/ThemeProvider";
import backStyle from "@styles/pageStyles.module.css";

export default function BackButton() {
	const router = useNavigate();
	const { theme } = useTheme();
	return (
		<div
			style={{
				position: "fixed",
				top: "0",
				left: "0",
				cursor: "pointer",
				padding: "1rem",
			}}
			className={`${backStyle.backContainer}`}
			onClick={() => router(-1)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
				fill={theme === "dark" ? "white" : "black"}
				className={backStyle.back}
			>
				<path fill="none" d="M0 0h24v24H0z" />
				<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
			</svg>
		</div>
	);
}
