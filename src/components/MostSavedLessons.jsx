import { useQuery } from "@tanstack/react-query";
import LottieLoader from "./LottieLoader";
import axios from "axios";
import { Link } from "react-router";

export default function MostSavedLessons() {
  const { data: popularLessons = [], isLoading } = useQuery({
    queryKey: ["most-saved-lessons"],
    queryFn: async () =>
      (await axios.get(`${import.meta.env.VITE_API_URL}/most-saved-lessons`)).data,
  });

  if (isLoading) <LottieLoader />;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-accent mb-4">
        Most Saved Lessons
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
        Array.isArray(popularLessons) && popularLessons.map((lesson) => (
          <div key={lesson._id} className="p-3 bg-base-200 rounded-lg shadow">
            <img
              src={lesson.image}
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="font-bold mt-2 text-sm">{lesson.title}</h3>
            <div className="flex justify-between items-center gap-2  mt-4">
              <p className="text-sm badge badge-sm badge-accent font-extrabold">
                {lesson.saveCount} Saves
              </p>
              <Link
                to={`/public-lessons/${lesson._id}`}
                className="btn btn-xs btn-warning hover:btn-info rounded-full"
              >
                View Details
              </Link>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  );
}
