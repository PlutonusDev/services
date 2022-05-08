import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Link from "next/link";
import PropagateLoader from "react-spinners/PropagateLoader";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { SiDiscord } from "react-icons/si";

export default function Login() {
	const router = useRouter();
	const [ loading, setLoading ] = useState(false);
	const [ successMsg, setSuccessMsg ] = useState("");
	const [ failMsg, setFailMsg ] = useState("");

	const loginSchema = Yup.object().shape({
		email: Yup.string()
			.email()
			.required("Email is required"),
		firstName: Yup.string()
			.required("First name is required"),
		lastName: Yup.string()
			.required("Last name is required"),
		dob: Yup.string()
			.required("Date of birth is required")
			.matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, "Date of birth must be in YYYY-MM-DD"),
		password: Yup.string()
			.required("Password is required"),
		passwordConfirm: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match")
			.required("Password Confirmation is required"),
		acceptTerms: Yup.bool()
			.oneOf([true], "You must accept the Terms")
	});
	const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(loginSchema) });
	const { errors } = formState;

	async function submitLogin(data) {
		setFailMsg("");
		setLoading(true);

		const user = await fetch("/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		}).then(resp => resp.json());

		if(user.authorised) {
			setSuccessMsg(`Welcome to Nyxa, ${user.firstName}.`);
			setTimeout(() => router.push(`https://console.nyxa.io/authorise?token=${user.token}`), 1000);
		} else {
			setFailMsg(user.msg || "You supplied invalid credentials.");
			setLoading(false);
		}
	}

	return (
		<div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-900 px-8 md:px-0">
			<div className="relative sm:max-w-sm w-full py-8">
				<div className="absolute -inset-0.5 rounded-3xl px-6 py-4 my-8 bg-gradient-to-br from-red-400 via-pink-400 to-purple-600 blur opacity-50" />
				<div className="relative w-full h-full rounded-3xl px-6 py-4 bg-gray-700 shadow-md">
					<img className="mx-auto mt-3 h-12" src="/static/images/logo-dark.png" />
					<label className="block mt-3 text-xl text-gray-50 text-center font-semibold">
						Register
					</label>

					<div className={`text-white mt-6 bg-green-300 flex flex-row items-center rounded-sm space-x-2 p-2 ${successMsg ? "block" : "hidden"}`}>
						<AiOutlineCheckCircle className="shrink-0" />
						<span>{successMsg}</span>
					</div>

					<div className={`text-white mt-6 bg-red-300 flex flex-row items-center rounded-sm space-x-2 p-2 ${failMsg ? "block" : "hidden"}`}>
						<AiOutlineCloseCircle className="shrink-0" />
						<span>{failMsg}</span>
					</div>

					{loading ? (
						<div className="flex flex-col w-full justify-center items-center py-12">
							<PropagateLoader color="#FAFAFA" size={15} />
							<span className="animate-pulse text-white text-lg mt-8 uppercase">Provisioning account</span>
						</div>
					) : (<>
						<div className="flex mt-5 mb-5 justify-center w-full">
							{/*<Link href={`https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent("identify email guilds guilds.join")}&prompt=none`}>
								<span style={{ "backgroundColor": "#5865F2" }} className="flex flex-row space-x-4 items-center px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
									<SiDiscord />
									<p>Continue with <span className="font-semibold">Discord</span></p>
								</span>
							</Link>*/}
						</div>

						{/*<div className="flex mt-7 items-center text-center">
							<hr className="border-gray-300 border-1 w-full rounded-md" />
							<label className="block font-medium text-sm text-gray-600 w-full">
								OR
							</label>
							<hr className="border-gray-300 border-1 w-full rounded-md" />
						</div>*/}

						<form onSubmit={handleSubmit(submitLogin)} className="mt-7 text-gray-50">
							<div className="form-control">
								<input {...register("email")} type="email" className={`text-lg mt-1 px-2 block w-full bg-gray-800 h-12 rounded-xl shadow-lg hover:bg-gray-900 focus:bg-gray-900 focus:ring-0 ${errors.username ? "border-red-500 border" : "border-none"}`} placeholder="Email" />
								<div className="px-2 h-6 text-red-500">{errors.username?.message}</div>
							</div>
							<div className="form-control">
								<input {...register("firstName")} type="text" className={`text-lg mt-1 px-2 block w-full bg-gray-800 h-12 rounded-xl shadow-lg hover:bg-gray-900 focus:bg-gray-900 focus:ring-0 ${errors.firstName ? "border-red-500 border" : "border-none"}`} placeholder="Firstname" />
								<div className="px-2 h-6 text-red-500">{errors.firstName?.message}</div>
							</div>
							<div className="form-control">
								<input {...register("lastName")} type="text" className={`text-lg mt-1 px-2 block w-full bg-gray-800 h-12 rounded-xl shadow-lg hover:bg-gray-900 focus:bg-gray-900 focus:ring-0 ${errors.lastName ? "border-red-500 border" : "border-none"}`} placeholder="Last Name" />
								<div className="px-2 h-6 text-red-500">{errors.lastName?.message}</div>
							</div>
							<div className="form-control">
								<input {...register("dob")} type="text" className={`text-lg mt-1 px-2 block w-full bg-gray-800 h-12 rounded-xl shadow-lg hover:bg-gray-900 focus:bg-gray-900 focus:ring-0 ${errors.dob ? "border-red-500 border" : "border-none"}`} placeholder="Date of Birth" />
								<div className="px-2 h-6 text-red-500">{errors.dob?.message}</div>
							</div>
							<div className="form-control">
								<input {...register("password")} type="password" className={`text-lg mt-2 px-2 block w-full bg-gray-800 h-12 rounded-xl shadow-lg hover:bg-gray-900 focus:bg-gray-900 focus:ring-0 ${errors.password ? "border-red-500 border" : "border-none"}`} placeholder="Password" />
								<div className="px-2 h-6 text-red-500">{errors.password?.message}</div>
							</div>
							<div className="form-control">
								<input {...register("passwordConfirm")} type="password" className={`text-lg mt-2 px-2 block w-full bg-gray-800 h-12 rounded-xl shadow-lg hover:bg-gray-900 focus:bg-gray-900 focus:ring-0 ${errors.passwordConfirm ? "border-red-500 border" : "border-none"}`} placeholder="Password Confirmation" />
								<div className="px-2 h-6 text-red-500">{errors.passwordConfirm?.message}</div>
							</div>
							<div className="mt-7 flex">
								<label htmlFor="tos" className="inline-flex items-center w-full cursor-pointer">
									<input {...register("acceptTerms")} id="tos" type="checkbox" className="rounded border-gray-800 text-indigo-600 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
									<span className={`ml-2 text-sm ${errors.acceptTerms ? "text-red-500" : "text-gray-400"}`}>
										I accept the <span className="font-semibold cursor-pointer text-indigo-300">Terms</span>
									</span>
								</label>

								<div className="w-full text-right">
									<Link href="/reset">
										<span className="underline text-sm text-gray-400 hover:text-gray-100 cursor-pointer">
											Reset Password
										</span>
									</Link>
								</div>
							</div>

							<div className="mt-7">
								<button type="submit" className="bg-indigo-500 w-full mb-2 py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
									Join
								</button>
							</div>
						</form>
					</>)}
				</div>
			</div>
			<p className="mt-8 text-gray-600 text-sm text-center">
				Already have an account?{" "}
				<Link href="/login">
					<span className="font-semibold cursor-pointer text-indigo-600">Sign in</span>
				</Link>
			</p>
		</div>
	);
}
