import { Outlet, useNavigation } from "react-router";
import Dashboard from "../pages/Dashboard/Dashboard";
import useAuth from "../hooks/useAuth";
import DynamicTitle from "../components/DynamicTitle";
import LottieLoader from "../components/LottieLoader";

const DashboardLayout = () => {
  const navigation = useNavigation();
  const { loading } = useAuth();

  const isLoading = loading || navigation?.state === "loading";
  return (
    <>
      <DynamicTitle />
      {isLoading ? (
        <LottieLoader />
      ) : (
        <div className="min-h-screen md:flex">
          {/* left side | sidebar */}
          <div>
            <Dashboard />
          </div>
          {/* right side | dynamic contents */}
          <div className="min-h-[calc(100vh-285px)]">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
