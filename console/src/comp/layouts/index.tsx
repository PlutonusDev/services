import { useState } from "react";

import SEO from "../meta/SEO";
import NavBar from "../ui/NavBar";
import Sidebar from "../ui/Sidebar";
import Footer from "../ui/Footer";

export default function DefaultLayout({ children, ...rest }) {
	const [ sidebarOpen, setSidebarOpen ] = useState(false);

	return (
		<body className="antialiased flex flex-col min-h-screen overflow-y-auto bg-gray-100">
			<SEO {...rest} />
			<div className="relative flex-grow">
				<NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<div className="lg:flex lg:flex-row">
					<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					<main className="flex-grow lg:ml-64">
						{children}
					</main>
				</div>
			</div>
			<Footer />
		</body>
	);
}
