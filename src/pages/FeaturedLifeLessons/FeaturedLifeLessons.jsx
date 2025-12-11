import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FeaturedLifeLessons() {
  const queryClient = useQueryClient();

  // ---------------------------
  // GET USER ROLE (Check Admin)
  // ---------------------------
  const [role, setRole] = useState("user");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user")); // adjust if needed
    if (currentUser?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/${currentUser.email}/role`)
        .then((res) => setRole(res.data.role));
    }
  }, []);

  // ---------------------------
  // FETCH FEATURED LESSONS
  // ---------------------------
  const { data: featured = [], isLoading } = useQuery({
    queryKey: ["featured-lessons"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/featured-lessons`
      );
      return res.data;
    },
  });

  // ---------------------------
  // REMOVE FEATURED LESSON
  // ---------------------------
  const removeMutation = useMutation({
    mutationFn: async (id) => {
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/featured-lessons/${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["featured-lessons"]); // refresh UI
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-accent font-bold text-3xl py-6">
        Featured Life Lessons
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {featured.map((lesson) => (
          <div key={lesson._id} className="bg-base-200 p-3 rounded-lg shadow">
            <img
              src={lesson.image}
              className="w-full h-32 object-cover rounded"
            />

            <h3 className="font-bold mt-2">{lesson.title}</h3>
            <p className="text-xs">
              {lesson.category} • {lesson.tone}
            </p>

            {/* Only admins can remove */}
            {role === "admin" && (
              <button
                onClick={() => removeMutation.mutate(lesson._id)}
                className="btn btn-xs btn-error mt-3 w-full"
              >
                Remove from Featured
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}





