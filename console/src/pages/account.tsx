import useUser from "../lib/useUser";
import Loader from "../comp/meta/Loader";
import Layout from "../comp/layouts";

export default function Account() {
	const { user } = useUser();

	return !user ? <Loader /> : (
		<Layout title="Account Settings">
			<section className="relative mt-12">
				<div className="max-w-6xl mx-auto px-4 md:px-6">
					<div className="pt-24 pb-8 md:pt-30 md:pb-12">
						<h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
							Account Information
						</h1>
						<p className="mt-6 text-gray-500">
							View and edit your account information here.
						</p>

						<div className="mt-8 flex flex-wrap space-y-4">
							<div className="w-full md:w-1/2 lg:w-1/3 mx-2">
								<h4 className="font-semibold">Name</h4>
								<p>{user.firstName} {user.lastName}</p>
							</div>
							<div className="w-full md:w-1/2 lg:w-1/3 mx-2">
								<h4 className="font-semibold">Email</h4>
								<p>{user.email}</p>
							</div>
							<div className="w-full md:w-1/2 lg:w-1/3 mx-2">
								<h4 className="font-semibold">Payment Methods</h4>
								<p>Mastercard &bull;&bull;&bull;&bull; 1234 01/23</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}
