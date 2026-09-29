import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./App.css";

import { Header } from "./Common/Header";
import { Footer } from "./Common/Footer";
import { AppRoute } from "./Routes/AppRoute";
import { SkeletonLoader } from "./Common/SkeletonLoader";


function App() {

  const [loader, setLoader] = useState(true);

  const location = useLocation();


  // Initial website loader
  useEffect(() => {

    const handleLoad = () => {
      setLoader(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };

  }, []);


  // Route change loader
  useEffect(() => {

    setLoader(true);

    const timer = setTimeout(() => {
      setLoader(false);
    }, 700);

    return () => {
      clearTimeout(timer);
    };

  }, [location.pathname]);


  // Global Skeleton
  if (loader) {
    return <SkeletonLoader />;
  }


  return (
    <>
      <Header />

      <main>
        <AppRoute />
      </main>

      <Footer />
    </>
  );
}

export default App;