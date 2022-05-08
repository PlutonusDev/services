import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import fetcher from "./fetcher";
import type { UserInfo } from "./session";

export default function useSession({ redirectTo = "", redirectIfFound = false } = {}) {
	const { data: user, mutate: mutateUser } = useSWR<UserInfo>("/api/auth", fetcher);

	useEffect(() => {
		if(!redirectTo || !user) return;

		if(
			(redirectTo && !redirectIfFound && !user?.authorised) ||
			(redirectIfFound && user?.authorised)
		) Router.push(redirectTo);
	}, [ user, redirectIfFound, redirectTo ]);

	return { user, mutateUser }
}
