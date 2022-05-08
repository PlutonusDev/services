import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar() {
	const [ scrolled, setScrolled ] = useState(false);

	useEffect(() => {
		const scrollHandler = () => {
			window.pageYOffset > 10 ? setScrolled(true) : setScrolled(false);
		}
		window.addEventListener("scroll", scrollHandler);
		return () => window.removeEventListener("scroll", scrollHandler);
	}, [ scrolled ]);

	return (
		<header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${scrolled && "bg-white backdrop-blur-sm shadow-lg"}`}>
			<div className="max-w-6xl mx-auto px-5 sm:px-6">
				<div className="flex items-center justify-between h-16 md:h-20">
					{/* Branding */}
					<div className="flex-shrink-0 mr-4">
						<Link href="/">
							<span className="flex items-center font-extrabold uppercase tracking-tight text-xl text-gray-700">
								<img className="h-8 mr-2" src="/static/images/logo-light.png" />
								NWS
							</span>
						</Link>
					</div>

					{/* Navigation */}
					<nav className="flex flex-grow">
						<ul className="flex flex-grow justify-end flex-wrap items-center">
							<li>
								<Link href="https://auth.nyxa.io/">
									<p className="px-2 py-1 rounded-md shadow-sm text-gray-200 bg-gray-700 hover:bg-gray-800 ml-3 cursor-pointer">
										Sign In
									</p>
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}
