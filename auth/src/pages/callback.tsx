import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import fetcher from "../lib/fetcher";
import Loader from "../comp/meta/Loader";

export default function Callback() {
	const router = useRouter();
	const [ message, setMessage ] = useState("Validating your session...");

	useEffect(() => {
		async function verifyCode() {
			const data = await fetcher(`/api/callback?code=${router.query.code}`);
			if(data.authorized) {
				setMessage(`Welcome, ${data.username}!`);
				return setTimeout(() => router.push(`https://dash.alyn.gg/authorize?token=${data.tokens.access}`), 1000);
			}
			setMessage("Something went wrong. Please try again.");
			setTimeout(() => router.push("/login"), 1000);
		}

		if(!router.query.code) return;
		verifyCode();
	}, [ fetcher, router ]);

	return (<>
		<Loader label={message} />
	</>);
}
