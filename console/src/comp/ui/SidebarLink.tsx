import { useRouter } from "next/router";

export default function SidebarLink({ icon, label, href }) {
	const router = useRouter();

	return (
		<a className={`flex items-center px-4 py-2 rounded-md ${(router.asPath === href || router.pathname === `/[project]${href}`) ? "text-gray-700 bg-gray-200" : "text-gray-600 transition-colors duration-200 transform hover:bg-gray-200 hover:text-gray-700"}`} href={href}>
			{icon}
			<span className="mx-4 font-medium">{label}</span>
		</a>
	);
}
