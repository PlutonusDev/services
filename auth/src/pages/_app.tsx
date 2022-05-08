import "../comp/styles/index.css";

export default function AlynApp({ Component, pageProps: { ...pageProps } }) {
	return <Component {...pageProps} />;
}
