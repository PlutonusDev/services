import { useState, useEffect } from "react";
import Link from "next/link";

import { AiOutlineMenu } from "react-icons/ai";

export default function NavBar({ sidebarOpen, setSidebarOpen }) {
	const [ scrolled, setScrolled ] = useState(false);

	return (
		<header className="fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out bg-white backdrop-blur-sm shadow-lg">
			<div className="max-w-6xl mx-auto lg:mx-4 px-5 sm:px-6">
				<div className="flex items-center lg:ml-2 justify-between lg:justify-start h-16 md:h-20">
					{/* Branding */}
					<div className="flex-shrink-0 mr-4">
						<Link href="/">
							<span className="flex items-center font-extrabold uppercase tracking-tight text-xl text-gray-700">
								<img className="h-8 mr-2" src="/static/images/logo-light.png" />
								NWS
							</span>
						</Link>
					</div>
					<button onClick={() => setSidebarOpen(!sidebarOpen)} className="block lg:hidden w-8 h-8 font-semibold flex items-center justify-center bg-white border-1 border-gray-300">
						<AiOutlineMenu />
					</button>
				</div>
			</div>
		</header>
	);
}
