import { useAuth } from "@providers/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useRedirect() {
	const { user } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (user) navigate("/dashboard");
	}, []);
}
