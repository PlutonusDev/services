import Link from "next/link";
import Layout from "../comp/layouts";

import { GrMagic } from "react-icons/gr";

export default function Services() {
	const services = [{
		name: "Billing and Subscriptions API",
		id: "payments",
		freeTier: true,
		category: "E-Commerce",
		description: "Enable Nyxa as a payment processor for your websites and applications. Fully customisable and PCI compliant checkout pages.",
		updated: "March 2022"
	}, {
		name: "Nyxa SSO",
		id: "sso",
		freeTier: true,
		category: "Security",
		description: "Use Nyxa SSO to handle authentication and authorisation between your websites and applications, with a simple oAuth2 api.",
		updated: "March 2022"
	}, {
		name: "Domain Registration",
		id: "domains",
		freeTier: false,
		category: "Hosting",
		description: "Register or transfer your dream domains to Nyxa and gain access to our enterprise DNS network and domain control toolsets.",
		updated: "March 2022"
	}, {
		name: "Saturn",
		id: "protect",
		freeTier: true,
		category: "Security",
		description: "Protect your websites from DDoS and other web-based exploits with Saturn, hiding your server's IP address/es and more.",
		updated: "March 2022"
	}];

	return (
		<Layout title="Explore Services">
			<section className="relative mt-12">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<div className="pt-24 pb-8 md:pt-30 md:pb-12">
						<h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
							Leverage our extensive and customisable services for your next project.
						</h1>
						<p className="mt-6 text-gray-500 flex flex-row space-x-2 items-center">
							<span>Services marked with a</span>
							<GrMagic className="text-indigo-400" />
							<span>have a <span className="text-indigo-400 font-semibold">free-tier</span> option.</span>
						</p>

						<div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
							{services.sort((a,b)=>a.name>b.name?1:-1).map(service => (
								<Link href={`/services/${service.id}`}>
									<div className="w-full px-8 py-4 mx-auto bg-white transition-colors duration-200 hover:bg-indigo-100 rounded-lg shadow-md group cursor-pointer">
										<div className="flex items-center justify-between">
											<span className="text-xl font-light text-gray-600">{service.freeTier ? <GrMagic /> : <></>}</span>
											<span className="px-3 py-1 text-sm font-bold text-gray-100 bg-gray-600 rounded-sm">{service.category || "Miscellaneous"}</span>
										</div>

										<div className="mt-3">
											<span className="text-2xl font-bold text-gray-700 group-hover:text-gray-600 group-hover:underline">
												{service.name}
											</span>
											<p className="mt-2 text-gray-600">
												{service.description}
											</p>
										</div>

										<div className="flex items-center justify-between mt-4">
											<span className="font-bold text-gray-700">Updated {service.updated}</span>
											<span className="text-indigo-400 group-hover:underline">Explore Service &rarr;</span>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}
