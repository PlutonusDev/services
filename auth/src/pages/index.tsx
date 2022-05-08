import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetcher from "../lib/fetcher";

import Loader from "../comp/meta/Loader";

export default function Index() {
	const [ message, setMessage ] = useState("Detecting your browser...");
	const router = useRouter();

	useEffect(() => {
		async function detectAuth() {
			const user = await fetcher("/api/auth");
			setMessage("Redirecting you...");
			if((user && !user.authorised) || !user) return router.push("/login");
			return router.push(`https://console.nyxa.io/authorise?token=${user.token}`);
		}

		detectAuth();
	}, [ fetcher, router ]);

	return <Loader label={message} />;
}
