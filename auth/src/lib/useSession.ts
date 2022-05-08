import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import fetcher from "./fetcher";
import type { UserInfo } from "./session";

export default function useSession({ redirectTo = "", redirectIfFound = false } = {}) {
	const { data: userData, mutate: mutateUser } = useSWR<UserInfo>("/api/auth", fetcher);

	useEffect(() => {
		if(!redirectTo || !userData) return;

		if(
			(redirectTo && !redirectIfFound && !userData?.authorized) ||
			(redirectIfFound && user?.loggedIn)
		) Router.push(redirectTo);
	}, [ userData, redirectIfFound, redirectTo ]);

	return { userData, mutateUser }
}
