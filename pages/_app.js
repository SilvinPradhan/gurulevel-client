import Header from "../components/header";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context/index";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer />
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
