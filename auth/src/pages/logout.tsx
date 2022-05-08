import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import fetcher from "../lib/fetcher";

import Loader from "../comp/meta/Loader";

export default function Logout() {
	const router = useRouter();
	const [ message, setMessage ] = useState("Deauthorizing your browser...");

	useEffect(() => {
		async function deauth() {
			await fetch("/api/logout");
			setMessage("Logged out. Redirecting...");
			return setTimeout(() => router.push("https://nyxa.io/"), 1000);
		}

		deauth();
	}, [ router, fetcher ])

	return (
		<Loader label={message} />
	);
}
