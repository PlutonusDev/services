import { useEffect } from "react";
import { useRouter } from "next/router";

import SEO from "../comp/meta/SEO";
import Loader from "../comp/meta/Loader";

export default function Index() {
	const router = useRouter();

	useEffect(() => {
		router.push("/services");
	}, [ router ]);

	return (<><SEO title="Nyxa Service Status" /><Loader label="Please wait..." /></>);
}
