import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from "react-toastify";
// import { motion } from "framer-motion";
import { AppProvider } from "../context/AppContext";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
      <ToastContainer />
    </>
  );
}

export default MyApp
