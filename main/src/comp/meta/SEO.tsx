import React from "react";
import Head from "next/head";

const SEO: React.FC<SEOProps> = ({ description, keywords, title, site_name, site_url, twitter_handle }) => (
	<Head>
		<title>[NWS] {title}</title>
		<meta name="description" content={description} />
		<meta name="keywords" content={keywords?.join(", ")} />
		<meta name="theme-color" content="#AC8DFB" />

		<meta property="og:type" content="website" />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		<meta property="og:site_name" content={site_name} />
		<meta property="og:url" content={site_url} />
		<meta property="og:image" content="/static/images/logo-light.png" />

		{/*<meta name="twitter:card" content="summary_large_image" />*/}
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:site" content={site_url} />
		<meta name="twitter:creator" content={twitter_handle} />
		<meta name="twitter:image" content="/static/images/logo-light.gif" />
	</Head>
);

export interface SEOProps {
	description?: string;
	lang?: string;
	meta?: any[];
	keywords?: string[];
	title?: string;
	site_name?: string;
	site_url?: string;
	twitter_handle?: string;
}

SEO.defaultProps = {
	site_name: "Nyxa Web Services",
	site_url: "https://nyxa.io/",
	twitter_handle: "@PlutonusDev",
	description: "Enterprise IT, at your fingertips.",
	keywords: [
		"web", "services", "api", "webservices",
		"server", "vps", "hosting", "billing", "payment",
		"processing", "gateway", "authorization", "authorisation",
		"auth", "database"
	]
}

export default SEO;
