import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import fetcher from "../lib/fetcher";

import Loader from "../comp/meta/Loader";

export default function Authorize() {
	const router = useRouter();
	const [ message, setMessage ] = useState("Authorising...");

	useEffect(() => {
		async function checkAuth() {
			const data = await fetcher(`/api/authorise?token=${router.query.token}`);
			if(!data.authorised) {
				setMessage("Something went wrong. Try again.");
				return setTimeout(() => router.push("https://auth.nyxa.io/logout"), 1000);
			}
			setMessage(`Welcome back, ${data.firstName}!`);
			setTimeout(() => router.push("https://console.nyxa.io/"), 1000);
		}

		if(!router.query.token) return;
		checkAuth();
	}, [ router, fetcher ]);

	return <Loader label={message} />;
}
