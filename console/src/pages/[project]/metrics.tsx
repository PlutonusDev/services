import useUser from "../../lib/useUser";
import Loader from "../../comp/meta/Loader";
import Layout from "../../comp/layouts";

export default function Account() {
	const { user } = useUser();

	return !user ? <Loader /> : (
		<Layout title="Project Metrics">
			<section className="relative mt-12">
				<div className="max-w-6xl mx-auto px-4 md:px-6">
					<div className="pt-24 pb-8 md:pt-30 md:pb-12">
						<h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
							Project Metrics
						</h1>
						<p className="mt-6 text-gray-500">
							Detailed graphs and information relating to your API usage.
						</p>

						<div className="mt-8 flex flex-wrap space-y-4">
							<p>...</p>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}
