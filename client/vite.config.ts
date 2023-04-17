import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { config } from "dotenv";
config();
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:8080/api",
				changeOrigin: true,
				rewrite: (path) => path.replace("/api", ""),
			},
		},
	},
	plugins: [react()],
	define: {
		"process.env": {
			STATE: process.env.REACT_APP_STATE,
			ENDPOINT:
				process.env.REACT_APP_STATE === "Production"
					? process.env.REACT_APP_PRODUCTION_ENDPOINT
					: process.env.REACT_APP_TESTING_ENDPOINT,
		},
	},
	resolve: {
		alias: {
			"@styles": path.resolve(__dirname, "./src/styles/"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@providers": path.resolve(__dirname, "./src/providers"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@utils": path.resolve(__dirname, "./src/utils"),
		},
	},
});
