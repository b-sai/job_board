// src/app/_app.tsx
import { AppProps } from "next/app";
import Head from "next/head";
import "../globals.css"; // Adjust this path based on your project structure

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Job Board - BSAIS Projects</title>
        <meta name="description" content="Description of your website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add other common head elements here */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
