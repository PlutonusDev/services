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
							<img className="h-8" src="/static/images/logo-light.png" />
						</Link>
					</div>

					{/* Navigation */}
					<nav className="flex flex-grow">
						<ul className="flex flex-grow justify-end flex-wrap items-center">
							<li>
								<Link href="/services">
									<p className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
										Service Status
									</p>
								</Link>
							</li>
							<li>
								<Link href="/dashboard">
									<p className="px-2 py-1 rounded-sm shadow-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
										Admin Login
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
