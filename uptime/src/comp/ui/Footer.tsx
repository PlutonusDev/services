import Link from "next/link";

export default function Footer() {
	return (
		<footer>
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-gray-200">
					<div className="sm:col-span-12 lg:col-span-3">
						<div className="mb-2">
							<Link href="/">
								<div className="inline-block">
									<img className="h-8" alt="logo" src="/static/images/logo-light.png" />
								</div>
							</Link>
						</div>
						<div className="text-sm text-gray-600">
							<Link href="https://nyxa.io/">
								<p className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out">
									Main Site
								</p>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
