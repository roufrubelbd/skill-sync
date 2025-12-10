import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router";

export default function PublicLessonsGrid() {
  const [liked, setLiked] = useState([]);

  // ✅ Your TanStack Query (used properly)
  const { data: publicLessons = [], isLoading } = useQuery({
    queryKey: ["public-lessons"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/public-lessons`
      );
      return result.data;
    },
  });

  const toggleLike = (id) => {
    setLiked((prev) => {
      if (prev.includes(id)) {
        return prev.filter((likedId) => likedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const card = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  //  Loading Skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="p-3 bg-white rounded-lg shadow animate-pulse"
            >
              <div className="h-36 bg-gray-200 rounded mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <AnimatePresence>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {publicLessons.map((lesson) => {
            const id = lesson._id;
            const isLiked = liked[id];

            return (
              <motion.article
                key={id}
                variants={card}
                whileHover={{
                  scale: 1.03,
                  y: -6,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                }}
                className="bg-base-200 rounded-lg overflow-hidden"
              >
                {/*  Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={lesson.image || "https://via.placeholder.com/400x300"}
                    alt={lesson.title}
                    className="w-full h-36 object-cover transition-transform duration-500 hover:scale-105"
                  />

                  {/*  Access Badge */}
                  <span className="absolute top-2 left-2 text-xs px-2 py-1 rounded bg-white/80 font-semibold">
                    {lesson.accessLevel?.toUpperCase()}
                  </span>

                  {/*  Like Button */}
                  <button
                    onClick={() => toggleLike(id)}
                    className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-red-500"
                  >
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>

                {/*  Content */}
                <div className="p-3">
                  <h4 className="text-sm font-semibold line-clamp-2">
                    {lesson.title}
                  </h4>

                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {lesson.description}
                  </p>

                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span className="px-1 py-1 bg-emerald-100 text-emerald-700 rounded">
                      {lesson.category}
                    </span>
                    <span className="px-1 py-1 bg-gray-100 rounded">
                      {lesson.tone}
                    </span>
                  </div>
                </div>

                {/*  Footer */}
                <div className="mx-4 md:mx-10 pb-1">
                  <Link
                    to={`/public-lessons/${id}`}
                    className="btn btn-xs hover:btn-warning w-full"
                  >
                    View Details
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
