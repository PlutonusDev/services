import { useEffect } from "react";
import { useRouter } from "next/router";
import fetcher from "../lib/fetcher";

import Loader from "../comp/meta/Loader";

export default function Logout() {
	const router = useRouter();

	useEffect(() => {
		async function Deauth() {
			await fetcher("/api/logout");
			router.push("https://auth.nyxa.io/logout");
		}

		Deauth();
	}, [ router, fetcher ]);

	return <Loader />;
}
