import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LottieLoader from "../../components/LottieLoader";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function MyFavorites() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [filters, setFilters] = useState({ category: "", tone: "" });

  //  Fetch all public lessons
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["favorite-lessons"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/public-lessons`
      );
      return res.data;
    },
  });

  // Filter lessons favorited by current user
  const favoriteLessons = useMemo(() => {
    return lessons.filter((l) => l.favorites?.includes(user?.email));
  }, [lessons, user]);

  // Filtered lessons based on category/tone
  const filteredLessons = useMemo(() => {
    return favoriteLessons.filter(
      (l) =>
        (!filters.category || l.category === filters.category) &&
        (!filters.tone || l.tone === filters.tone)
    );
  }, [favoriteLessons, filters]);

  // 2️⃣ Remove favorite mutation
  const removeFavoriteMutation = useMutation({
    mutationFn: async (lessonId) => {
      await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/details/favorite/${lessonId}`,
        {
          email: user.email,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favorite-lessons"]);
    },
  });

  if (isLoading) return <LottieLoader />;

  // Extract unique categories & tones for filtering dropdowns
  const categories = [...new Set(favoriteLessons.map((l) => l.category))];
  const tones = [...new Set(favoriteLessons.map((l) => l.tone))];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-info mb-6 uppercase">
        My Favorite Lessons
      </h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <select
          className="border rounded px-3 py-2"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2"
          value={filters.tone}
          onChange={(e) => setFilters({ ...filters, tone: e.target.value })}
        >
          <option value="">All Tones</option>
          {tones.map((tone) => (
            <option key={tone} value={tone}>
              {tone}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-blue-50">
            <tr className="text-left">
              <th className="py-3 px-4">Lesson</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Tone</th>
              <th className="py-3 px-4">Created By</th>
              <th className="py-3 px-4">Saved Count</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLessons.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No favorite lessons found.
                </td>
              </tr>
            ) : (
              filteredLessons
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((lesson) => (
                  <motion.tr
                    key={lesson._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01, backgroundColor: "#fef3c7" }}
                    className="border-b"
                  >
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={lesson.image}
                        alt={lesson.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">{lesson.title}</p>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {lesson.description}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{lesson.category}</td>
                    <td className="py-3 px-4">{lesson.tone}</td>
                    <td className="py-3 px-4">{lesson.createdByEmail}</td>
                    <td className="py-3 px-4">
                      {lesson.favorites?.length || 0}
                    </td>
                    <td className="py-3 px-4 flex justify-center gap-2">
                      <Link
                        to={`/public-lessons/${lesson._id}`}
                        className="btn btn-sm btn-info hover:btn-secondary"
                      >
                        View
                      </Link>
                      <button
                        onClick={() =>
                          removeFavoriteMutation.mutate(lesson._id)
                        }
                        className="btn btn-sm btn-error hover:btn-warning"
                      >
                        Remove
                      </button>
                    </td>
                  </motion.tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
