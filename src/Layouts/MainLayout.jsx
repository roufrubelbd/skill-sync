import { Outlet, useNavigation } from "react-router";
import useAuth from "../hooks/useAuth";
import DynamicTitle from "../components/DynamicTitle";
import Navbar from "../components/Navbar";
import LottieLoader from "../components/LottieLoader";
import Footer from "../components/Footer";

const MainLayout = () => {
  const navigation = useNavigation();
  const { loading } = useAuth();

  const isLoading = loading || navigation?.state === "loading";
  return (
    <>
      <DynamicTitle />
      <Navbar />
      {isLoading ? (
        <LottieLoader />
      ) : (
        <div className="min-h-screen w-11/12 mx-auto">
        {/* <div className="min-h-[calc(100vh-285px)]"> */}
          <Outlet />
        </div>
      )}
      <Footer />
    </>
  );
};

export default MainLayout;
