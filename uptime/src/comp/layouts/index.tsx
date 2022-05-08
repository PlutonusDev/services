import SEO from "../meta/SEO";
import NavBar from "../ui/NavBar";
import Footer from "../ui/Footer";

export default function DefaultLayout({ children, ...rest }) {
	return (
		<body className="antialiased flex flex-col min-h-screen overflow-y-auto">
			<SEO {...rest} />
			<NavBar />
			<main className="flex-grow">
				{children}
			</main>
			<Footer />
		</body>
	);
}
