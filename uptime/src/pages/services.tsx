import { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import Layout from "../comp/layouts";
import PuffLoader from "react-spinners/PuffLoader";
import { AiOutlineCheck, AiOutlineWarning } from "react-icons/ai";
import { IoMdOpen } from "react-icons/io";

export default function Services() {
	const [ loading, setLoading ] = useState(true);
	useEffect(() => {
		setTimeout(() => setLoading(false), 4000);
	}, []);

	const groups = [{
		name: "Nyxa Services Portal",
		children: [{
			id: "ns-auth",
			name: "Registration / Login",
			status: [0,0,0,0,0,0,0,0,1,0,0,0],
			uptime: 100
		}, {
			id: "ns-servprov",
			name: "Service Provisioning",
			status: [0,0,0,0,0,0,0,0,0,0,0,0],
			uptime: 100
		}, {
			id: "ns-inter",
			name: "Internal API",
			status: [0,0,1,1,1,0,0,0,0,0,0,0],
			uptime: 100
		}, {
			id: "ns-cdn",
			name: "CDN",
			status: [0,0,0,0,0,0,0,0,0,0,0,0],
			uptime: 100
		}]
	}, {
		name: "Billing Services",
		children: [{
			id: "bill-api",
			name: "API Gateway",
			status: [0,0,0,0,0,0,0,0,0,0,0,0],
			uptime: 100
		}, {
			id: "bill-proc",
			name: "Bill Processing",
			status: [1,1,0,0,0,0,1,0,1,1,1,1],
			uptime: 100
		}, {
			id: "bill-gate",
			name: "Payment Gateway",
			status: [0,0,1,2,2,1,1,1,0,0,0,0],
			uptime: 83.4
		}, {
			id: "bill-adm",
			name: "Admin Panel",
			status: [2,2,2,2,1,0,0,0,0,1,1,2],
			uptime: 41.7
		}]
	}, {
		name: "Authorisation Services",
		children: [{
			id: "auth-api",
			name: "API Gateway",
			status: [0,0,0,0,0,1,1,1,0,0,0,0],
			uptime: 100
		}, {
			name: "auth-data",
			name: "Database Translink",
			status: [1,1,0,0,0,0,0,0,0,1,1,2],
			uptime: 91.7
		}, {
			name: "auth-fs",
			name: "Fileserver",
			status: [0,0,0,0,0,0,0,0,0,0,0,0],
			uptime: 100
		}]
	}]

	const offline = <div className="w-1 h-2 bg-red-500"></div>;
	const degraded = <div className="w-1 h-2 bg-yellow-500"></div>;
	const online = <div className="w-1 h-2 bg-green-500"></div>;

	return (
		<Layout title="Nyxa Service Status">
			<section className="relative">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<div className="pt-32 pb-8 md:pt-40 md:pb-12">
						<div className="text-center">
							<h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
								Nyxa Service Status
							</h1>
							<div className="max-w-3xl mx-auto" data-aos="zoom-y-out" data-aos-delay="150">
								<p className="text-xl text-gray-600 mb-8 mx-4 sm:mx-0">
									Live and historical data and alerts for Nyxa Web Services.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="relative">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					{groups.map(group => (<>
						<div className="container p-2 mb-8 mx-auto sm:p-4" data-aos="fade-right" data-aos-once={true} data-aos-duration="200">
							<h2 className="ml-2 text-2xl font-semibold leading-tight">{group.name}</h2>
							<span className="ml-2 mb-4 uppercase text-sm text-gray-500">Past 12 Hours</span>
							{loading ? (
								<div className="flex flex-col items-center justify-center w-full h-24 bg-gray-100 shadow-md rounded-md">
									<PuffLoader size={30} />
									<span className="font-semibold text-gray-500 uppercase animate-pulse">Checking services...</span>
								</div>
							) : (
								<div className="overflow-x-auto">
									<table className="w-full p-6 text-xs text-left whitespace-nowrap bg-gray-100 rounded-md shadow-md my-2">
										<tbody>
											{group.children.map(service => (
												<tr>
													<td className="p-2">
														<span className="flex justify-center items-center">
															{service.status[11] === 0 ? (
																<AiOutlineCheck className="text-green-500 shrink-0 text-lg" />
															) : (
																<AiOutlineWarning className={`${service.status[11] == 1 ? "text-yellow-500" : "text-red-500"} shrink-0 text-lg`} />
															)}
														</span>
													</td>
													<td className="pr-3 py-2 flex flex-col">
														{service.name}
														{service.status[11] === 0 && <span className="text-green-500">ONLINE</span>}
														{service.status[11] === 1 && <span className="text-yellow-500">DEGRADED</span>}
														{service.status[11] === 2 && <span className="text-red-500">OFFLINE</span>}
													</td>
													<td className="pl-3 py-2">
														<div className="flex flex-col justify-center items-center">
															<span className="flex flex-row space-x-1">
																{service.status.map(status => (<>
																	{status === 0 && online}
																	{status === 1 && degraded}
																	{status === 2 && offline}
																</>))}
															</span>
															<p className={`uppercase font-semibold  ${service.uptime > 90 ? "text-green-500" : service.uptime > 50 ? "text-yellow-500" : "text-red-500"}`}>{service.uptime}% Uptime</p>
														</div>
													</td>
													<td className="p-2">
														<Link href={`/services/${service.id}`}>
															<span className="flex justify-center items-center">
																<IoMdOpen className="text-gray-500 shrink-0 text-lg hover:pointer-cursor" />
															</span>
														</Link>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
						</div>
					</>))}
				</div>
			</section>
		</Layout>
	);
}
