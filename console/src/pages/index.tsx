import { useState, useEffect } from "react";
import useUser from "../lib/useUser";
import Layout from "../comp/layouts";
import Loader from "../comp/meta/Loader";
import Link from "next/link";

import { GiReceiveMoney } from "react-icons/gi";

export default function Index() {
	const [ mounted, setMounted ] = useState(false);
	const { user } = useUser();
	const hrs = new Date().getHours();

	useEffect(() => setMounted(true), []);

	return !mounted ? <Loader /> : (
		<Layout title="Welcome">
			<section className="relative mt-12">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<div className="pt-24 pb-8 md:pt-30 md:pb-12">
						<h1 className="text-3xl ml-2 mb-6 font-semibold tracking-tight leading-tight text-gray-800">
							<span className="underline">{hrs && hrs<12?"Good morning":hrs>=12&&hrs<=17?"Good afternoon":"Good evening"}</span>{user && `, ${user.firstName}`}.
						</h1>

						<div className="grid gap-8 mx-4 items-start justify-center">
							<div className="relative group">
								<div className="absolute blur-sm -inset-0.5 bg-gradient-to-br from-pink-600 via-yellow-600 to-purple-600 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 rounded-lg opacity-75 animate-gradient-xy" />
								<Link href="/services/billing">
									<button className="relative px-7 py-4 bg-white rounded-lg leading-none flex items-center divide-x divide-gray-600">
										<span className="flex items-center space-x-2">
											<GiReceiveMoney className="text-xl font-bold -rotate-12 shrink-0" />
											<span className="pr-6 font-semibold text-gray-800">Billing services are now available</span>
										</span>
										<span className="pl-6 text-indigo-400 group-hover:text-gray-900 transition duration-200">Check it out &rarr;</span>
									</button>
								</Link>
							</div>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
							<div className="w-full my-4 bg-white rounded-sm shadow-md">
								<div className="w-full rounded-sm mb-2 p-4 bg-green-500 text-white font-semibold">
									NWS Health
								</div>
								<div className="p-4 mx-auto">
									<div className="flex flex-col justify-between col-span-12 py-2 space-y-8 md:space-y-16 md:col-span-3">
										<div className="flex flex-col space-y-2 w-full">
											<h3 className="flex items-center ml-4 space-x-2">
												<span className="text-xs font-semibold tracking-wider uppercase">All systems online</span>
												<span className="animate-ping flex-shrink-0 w-2 h-2 uppercase rounded-full bg-green-500" />
											</h3>
											<a rel="noopener noreferrer" href="https://status.nyxa.io/" className="ml-4 text-indigo-400 hover:underline cursor-pointer">View status page &rarr;</a>
											<p className="text-xs ml-auto">Updated just now</p>
										</div>
									</div>
								</div>
							</div>

							<div className="w-full lg:my-4 bg-white rounded-sm shadow-md">
								<div className="w-full rounded-sm mb-2 p-4 bg-gray-200 text-gray-800 font-semibold">
									Explore Nyxa
								</div>
								<div className="p-4 mx-auto">
									<div className="flex flex-col justify-between col-span-12 py-2 space-y-8 md:space-y-16 md:col-span-3">
										<div className="flex flex-col space-y-2 w-full ml-4">
											<span>&bull;{" "}Visit your{" "}<span className="text-indigo-400 hover:underline cursor-pointer">security panel</span>.</span>
											<span>&bull;{" "}See your{" "}<span className="text-indigo-400 hover:underline cursor-pointer">API usage metrics</span>.</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}
