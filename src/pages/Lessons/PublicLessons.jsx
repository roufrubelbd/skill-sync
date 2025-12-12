import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useState, useMemo } from "react";

export default function PublicLessons() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [tone, setTone] = useState("all");

  //  Fetch lessons
  const { data: publicLessons = [], isLoading } = useQuery({
    queryKey: ["public-lessons"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/public-lessons`
      );
      return result.data;
    },
  });

  //  Fetch creator
  const { data: creatorData = [], isLoading: isLoadingCreatorData } = useQuery({
    queryKey: ["creator-data"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/users`);
      return result.data;
    },
  });

  //  FILTER LOGIC (KEYWORDS + CATEGORY + TONE)
  const filteredLessons = useMemo(() => {
    return publicLessons.filter((lesson) => {
      const matchesSearch = lesson.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "all" || lesson.category === category;

      const matchesTone = tone === "all" || lesson.tone === tone;

      return matchesSearch && matchesCategory && matchesTone;
    });
  }, [publicLessons, search, category, tone]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const card = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  //  LOADING STATE
  if (isLoading || isLoadingCreatorData) {
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
      {/*  FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        {/*  Search */}
        <input
          type="text"
          placeholder="Search lessons..."
          className="input input-bordered w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/*  Category */}
        <select
          className="select select-bordered w-full md:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Career">Career</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Relationships">Relationships</option>
          <option value="Mindset">Mindset</option>
        </select>

        {/*  Tone */}
        <select
          className="select select-bordered w-full md:w-1/4"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="all">All Tones</option>
          <option value="Gratitude">Gratitude</option>
          <option value="Motivational">Motivational</option>
          <option value="Realization">Realization</option>
        </select>
      </div>

      {/*  GRID */}
      <AnimatePresence>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {filteredLessons.map((lesson) => {
            const creator = creatorData.find(
              (user) => user.email === lesson.createdByEmail
            );
            return (
              <motion.article
                key={lesson._id}
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
                    src={lesson.image || "https://i.postimg.cc/zBVKcBMc/4.png"}
                    alt={lesson.title}
                    className="w-full h-36 object-cover transition-transform duration-500 hover:scale-105"
                  />

                  <span className="absolute top-2 left-2 text-xs px-2 py-1 rounded bg-white/80 font-semibold">
                    {lesson.accessLevel?.toUpperCase()}
                  </span>
                </div>

                {/*  Content */}
                <div className="p-3">
                  <h4 className="text-sm font-semibold line-clamp-2">
                    {lesson.title}
                  </h4>

                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {lesson.description}
                  </p>

                  <div className="my-1 flex justify-between text-xs text-gray-500">
                    <span className="px-1 py-1 bg-emerald-100 text-emerald-700 rounded">
                      {lesson.category}
                    </span>
                    <span className="px-1 py-1 bg-gray-100 rounded">
                      {lesson.tone}
                    </span>
                  </div>

                  <div className="pt-1 flex justify-start items-center text-xs text-gray-500 border-t border-gray-200">
                    <span className=" mr-2">
                      <img
                        className="w-7 h-7 rounded-full bg-blue-100 p-1"
                        src={creator?.photoURL}
                        alt={creator?.name}
                      />
                    </span>
                    <span>Created by: {creator?.name}</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    <span>Created at: {lesson?.createdAt}</span>
                  </div>
                </div>

                {/*  Footer */}
                <div className="mx-4 md:mx-10 pb-2">
                  <Link
                    to={`/public-lessons/${lesson._id}`}
                    className="btn btn-xs hover:btn-warning border border-gray-300 rounded-lg w-full"
                  >
                    View Details
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/*  Empty State */}
      {filteredLessons.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No lessons found matching your filters.
        </p>
      )}
    </div>
  );
}
