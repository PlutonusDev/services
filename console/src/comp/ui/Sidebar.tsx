import { useRouter } from "next/router";
import SidebarLink from "./SidebarLink";
import { AiOutlineHome, AiOutlineSecurityScan } from "react-icons/ai";
import { BiReceipt, BiExit } from "react-icons/bi";
import { HiOutlineSelector } from "react-icons/hi";
import { MdOutlineScience, MdOutlineExplore } from "react-icons/md";
import { RiAccountBoxLine } from "react-icons/ri";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
	const router = useRouter();

	return (
		<aside className={`fixed top-0 lg:block pt-4 lg:pt-20 z-40 lg:z-10 flex flex-col -left-64 lg:left-0 w-64 h-screen px-4 py-8 bg-white border-r transition duration-200 ease-in-out ${sidebarOpen && "translate-x-64"}`}>
			<h2 className="lg:hidden text-3xl font-semibold text-gray-800">Nyxa</h2>
			<p className="mt-6 uppercase text-sm text-gray-600 p-2">Select your Project</p>
			<div className="relative">
				<select className="appearance-none w-full py-2 pl-4 pr-10 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search Services">
					<option>{router.query.project || "None selected"}</option>
				</select>
				<span className="absolute inset-y-0 right-0 flex items-center pr-3">
					<HiOutlineSelector />
				</span>
			</div>
			<div className="flex flex-col justify-between flex-1 mt-6">
				<nav>
					<SidebarLink icon={<AiOutlineHome />} label="Home" href="/" />
					<SidebarLink icon={<RiAccountBoxLine />} label="Account Settings" href="/account" />
					<SidebarLink icon={<BiReceipt />} label="Billing" href="/billing" />
					<SidebarLink icon={<AiOutlineSecurityScan />} label="Security Center" href="/security" />
					{router.query.project && (<>
						<hr className="my-6 border-gray-200" />
						<p className="uppercase text-sm text-gray-600 p-2">This Project</p>
						<SidebarLink icon={<MdOutlineScience />} label="Usage Metrics" href={`/${router.query.project}/metrics`} />
						<SidebarLink icon={<MdOutlineExplore />} label="Explore Services" href={`/${router.query.project}/services`} />
					</>)}
				</nav>
				<div className="my-4">
					<SidebarLink icon={<BiExit className="text-red-500" />} label="Logout" href="/logout" />
				</div>
			</div>
		</aside>
	);
}
