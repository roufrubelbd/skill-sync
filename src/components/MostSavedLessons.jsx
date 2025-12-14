import { useQuery } from "@tanstack/react-query";
import LottieLoader from "./LottieLoader";
import useAxiosSecure from "../hooks/useAxiosSecure";


export default function MostSavedLessons() {
  const axiosSecure = useAxiosSecure();
const { data: popularLessons = [], isLoading } = useQuery({
  queryKey: ["most-saved-lessons"],
  queryFn: async () =>
    (await axiosSecure.get(`${import.meta.env.VITE_API_URL}/most-saved-lessons`)).data,
});

if (isLoading) <LottieLoader />;

    return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-accent mb-4">
        Most Saved Lessons
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {popularLessons.map((lesson) => (
          <div key={lesson._id} className="p-3 bg-base-200 rounded-lg shadow">
            <img
              src={lesson.image}
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="font-bold mt-2 text-sm">{lesson.title}</h3>
            <p className="text-sm badge badge-xl badge-warning font-extrabold mt-4">
               {lesson.saveCount} Saves
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
