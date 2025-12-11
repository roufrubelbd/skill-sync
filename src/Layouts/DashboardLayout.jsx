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
        <div className="min-h-screen md:flex px-4 mx-auto xs:gap-4 py-4 bg-gray-500">
          {/* left side | sidebar */}
          <div className="w-full md:w-1/6 px-4 justify-start bg-base-200 md:rounded-l-lg">
            <DashboardNavbar />
          </div>
          {/* right side | dynamic contents */}
          <div className="w-full md:w-5/6 px-4 flex-1 justify-end bg-base-100 md:rounded-r-lg">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
