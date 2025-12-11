import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useIsPremium = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isPremium = false, isLoading: isPremiumLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["user-isPremium", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users/${user.email}/isPremium`);
      return result.data?.isPremium || false;
    },
  });
  return [isPremium, isPremiumLoading];
};

export default useIsPremium;


// const useRole = () => {
//   const { user, loading } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: role = "user", isLoading: isRoleLoading } = useQuery({
//     enabled: !loading && !!user?.email,
//     queryKey: ["user-role", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/${user.email}/role`);
//       return res.data?.role || "user";
//     },
//   });
//   return [role, isRoleLoading];
// };

// export default useRole;
