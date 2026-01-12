import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LottieLoader from "../../components/LottieLoader";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

export default function FeaturedLifeLessons() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // ---------------------------
  // GET USER ROLE via custom Hook
  // ---------------------------
  const { role } = useRole();

  // ---------------------------
  // FETCH FEATURED LESSONS
  // ---------------------------
  const { data: featured = [], isLoading, error } = useQuery({
  queryKey: ["featured-lessons"],
  queryFn: async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/featured-lessons`
      );
      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      console.error("Error fetching featured lessons:", error);
      throw error;
    }
  },
});

// if (isLoading) return <LottieLoader />;

//   console.log(featured);
// console.log(Array.isArray(featured));


  // ---------------------------
  // REMOVE FEATURED LESSON
  // ---------------------------
  const removeMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(
        `${import.meta.env.VITE_API_URL}/featured-lessons/${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["featured-lessons"]);
    },
  });

  if (isLoading) return <LottieLoader />;
  if (error) return <div>Error loading featured lessons</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-accent font-bold text-3xl py-6">
        Featured Life Lessons
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {
         featured.map((lesson) => (
          <div
            key={lesson._id}
            className="bg-base-100 rounded hover:shadow "
          >
            <img
              src={lesson.image}
              className="w-full h-32 object-cover rounded-t"
            />

            <div className="p-3">
              <h3 className="font-bold mt-2">{lesson.title}</h3>
            <div className="flex justify-between items-center gap-2 mt-2">
              <p className="p-1 rounded bg-green-100">{lesson.category}</p>
              <Link
                to={`/public-lessons/${lesson.lessonId}`}
                className="btn btn-xs btn-warning hover:btn-info rounded-full"
              >
                View Details
              </Link>
            </div>

            {/* Only admins can remove */}
            {role === "admin" && (
              <button
                onClick={() => removeMutation.mutate(lesson._id)}
                className="btn btn-xs btn-warning mt-3 w-full"
              >
                Remove from Featured
              </button>
            )}
            </div>
          </div>
        ))
        }
      </div>
    </div>
  );
}
