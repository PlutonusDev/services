import { Fragment, useState, useRef } from "react";
import crypto from "crypto";
import useUser from "../lib/useUser";

import { Dialog, Transition } from "@headlessui/react";
import Loader from "../comp/meta/Loader";
import Layout from "../comp/layouts";

import { BsFillShieldLockFill, BsKey, BsCloudHaze } from "react-icons/bs";

export default function Account() {
	const twoFactor = require("node-2fa");
	const [ decryptModal, setDecryptModal ] = useState(false);
	const decryptModalCancelButton = useRef(null);

	const [ o2fa, set2fa ] = useState({});

	const [ tab, setTab ] = useState("account");
	const { user } = useUser();

	const keys = [{
		name: "Testing",
		key: `NYXA-V1.${crypto.randomBytes(12).toString("hex")}:${crypto.randomBytes(20).toString("hex")}`,
		created: "a few seconds ago"
	}, {
		name: "Testing 2",
		key: `NYXA-V1.${crypto.randomBytes(12).toString("hex")}:${crypto.randomBytes(20).toString("hex")}`,
		created: "2 minutes ago"
	}]

	return !user ? <Loader /> : (<>
		<Layout title="Account Settings">
			<section className="relative mt-12">
				<div className="max-w-6xl mx-auto px-4 md:px-6">
					<div className="pt-24 pb-8 md:pt-30 md:pb-12">
						<h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
							Security Center
						</h1>
						<p className="mt-6 text-gray-500">
							Manage your applications, tokens, and API keys.
						</p>

						<div className="mt-8 flex border-b border-gray-200">
							<button onClick={() => setTab("account")} className={`flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2 ${tab === "account" ? "text-blue-600 border-blue-500" : "text-gray-700 border-transparent cursor-base hover:border-gray-400"} sm:px-4 -px-1 whitespace-nowrap focus:outline-none`}>
								<BsFillShieldLockFill />
								<span className="mx-1 text-sm sm:text-base">
									Account Security
								</span>
							</button>

							<button onClick={() => setTab("keys")} className={`flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2 ${tab === "keys" ? "text-blue-600 border-blue-500" : "text-gray-700 border-transparent cursor-base hover:border-gray-400"} sm:px-4 -px-1 whitespace-nowrap focus:outline-none`}>
								<BsKey />
								<span className="mx-1 text-sm sm:text-base">
									API Keys
								</span>
							</button>

							<button onClick={() => setTab("oauth")} className={`flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2 ${tab === "oauth" ? "text-blue-600 border-blue-500" : "text-gray-700 border-transparent cursor-base hover:border-gray-400"} sm:px-4 -px-1 whitespace-nowrap focus:outline-none`}>
								<BsCloudHaze />
								<span className="mx-1 text-sm sm:text-base">
									oAuth2 Apps
								</span>
							</button>
						</div>

						<div className="mt-8">
							{tab === "account" && (<>
								<div>
									<h3 className="text-md tracking-wide font-medium mb-2">Enhance your NWS Account security.</h3>
									<div className="flex flex-row space-x-2 mb-4">
										<button onClick={() => set2fa(twoFactor.generateSecret({name: "Nyxa Web Services", account: user.email}))} className="px-3 py-2 border-1 border-gray-300 shadow-sm bg-white rounded-sm font-medium text-gray-900">Add 2FA</button>
										<button className="px-3 py-2 border-1 border-gray-300 shadow-sm bg-white rounded-sm font-medium text-gray-900">Change your Password</button>
									</div>
									{o2fa.qr && (
										<div className="flex flex-wrap items-center justify-center w-full space-x-4 space-y-2">
											<img className="p-2 bg-gray-300 rounded-md shadow-md" src={o2fa.qr} />
											<div className="flex flex-col sm:text-center md:text-left">
												<h4 className="font-medium text-md">Scan with a 2FA authenticator app.</h4>
												<p className="text-gray-600">Enter the security code below:</p>
											</div>
										</div>
									)}
								</div>
							</>)}
							{tab === "keys" && (<>
								<div className="w-full flex justify-between mb-2">
									<button onClick={() => setDecryptModal(true)} className="px-3 py-2 border-1 border-gray-300 shadow-sm bg-white rounded-sm font-medium text-gray-900">Decrypt Keys</button>
									<button className="px-3 py-2 border-1 border-gray-300 shadow-sm bg-green-200 rounded-sm font-medium text-gray-900">Create New Key</button>									
								</div>
								<div className="overflow-x-auto">
									<table className="min-w-full">
										<thead>
											<tr className="bg-gray-200">
												<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
													Name
												</th>
												<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
													Key
												</th>
												<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
													Date Created
												</th>
												<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
													Tools
												</th>
											</tr>
										</thead>
										<tbody>
											{keys.map(key => (
												<tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
													<td className="px-6 py-4 whitespace-nowrapfont-medium text-gray-900">
														{key.name}
													</td>
													<td className="text-sm text-gray-900 font-serif px-6 py-4 whitespace-nowrap flex items-center space-x-2 group">
														<span className="bg-gray-200 px-2 py-1 rounded-md group-hover:bg-indigo-100 group-hover:shadow-sm transform transition duration-200">{key.key.substring(0, 7)} ...</span>
														<span className="text-xs group-hover:underline">(click to reveal)</span>
													</td>
													<td className="text-sm text-gray-900 font-serif px-6 py-4 whitespace-nowrap">
														{key.created}
													</td>
													<td className="text-sm text-gray-900 font-serif px-6 py-4 whitespace-nowrap">
														<p>Buttons here soon&trade;</p>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</>)}
							{tab === "oauth" && (
								<p>oauth</p>
							)}
						</div>
					</div>
				</div>
			</section>
		</Layout>

		<Transition as={Fragment} show={decryptModal}>
			<Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={decryptModalCancelButton} onClose={setDecryptModal}>
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>
					<span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
					<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
						<div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
										<p>Icon</p>
									</div>
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
											Decrypt API Keys
										</Dialog.Title>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												Enter your Nyxa account password to decrypt your API keys. This will allow you to copy them.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="w-full flex items-center justify-center">
								<input type="password" className="px-6 py-2 mb-4 mx-8 sm:mx-4 w-full text-center rounded-sm border shadow-sm px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm" />
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button className="mb-2 sm:mb-0 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setDecryptModal(false)} ref={decryptModalCancelButton}>
									Cancel
								</button>
								<button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => console.log("CLICK")}>
									Decrypt
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	</>);
}
