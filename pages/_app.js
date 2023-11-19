import Head from "next/head";
import { Component } from "react";
import GlobalStyle from "../src/theme/GlobalStyle";
import NavBar from "../src/components/patterns/NavBar";
import { Noto_Sans } from "next/font/google";
import FootBar from "../src/components/patterns/FootBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Smart Harpia</title>
      </Head>
      <main className={noto.className}>
        <GlobalStyle />
        <NavBar />
        <ToastContainer />
        <Component {...pageProps} />
        <FootBar />
      </main>
    </>
  );
}
