// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Import bootstrap JS bundle
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <Component {...pageProps} />;
}

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";