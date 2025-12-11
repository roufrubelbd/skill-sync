import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LottieLoader from "./LottieLoader";


export default function TopContributors() {
const { data: contributors = [], isLoading } = useQuery({
  queryKey: ["top-contributors"],
  queryFn: async () =>
    (await axios.get(`${import.meta.env.VITE_API_URL}/top-contributors`)).data,
});

if (isLoading) <LottieLoader />;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-accent mb-4">
        Top Contributors of the Week
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {contributors.map((user, i) => (
          <div key={i} className="p-4 bg-blue-100 shadow rounded-lg">
            <div className="flex items-center gap-3">
              <img
                src={user.userData.photoURL || '/default.png'}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-bold">{user.userData.name}</h3>
                <p className="text-xs opacity-70">{user._id}</p>
              </div>
            </div>

            <p className="mt-2 font-semibold">
              Lessons Created: {user.count}
            </p>

            <span className="badge badge-xl badge-warning mt-4 font-extrabold">
              Top {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
