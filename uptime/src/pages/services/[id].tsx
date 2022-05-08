import { useRouter } from "next/router";

export default function ServiceOverview() {
	const router = useRouter();

	return <p>{JSON.stringify(router.query)}</p>
}
