import { Outlet, useNavigation } from "react-router";
import DynamicTitle from "../components/DynamicTitle";
import LottieLoader from "../components/LottieLoader";
import DashboardNavbar from "../pages/Dashboard/DashboardNavbar";
// import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const navigation = useNavigation();
  // const [isRoleLoading] = useRole();

  // const isLoading = isRoleLoading || navigation?.state === "loading";
  const isLoading = navigation?.state === "loading";
  return (
    <>
      <DynamicTitle />
      {isLoading ? (
        <LottieLoader />
      ) : (
        <div className="min-h-screen md:flex w-11/12 mx-auto gap-6 py-10">
          {/* left side | sidebar */}
          <div className="w-full md:w-1/5 justify-start bg-base-200">
            <DashboardNavbar />
          </div>
          {/* right side | dynamic contents */}
          <div className="w-full md:w-4/5 flex-1 justify-end">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
