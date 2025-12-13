// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Link } from "react-router";
// import LottieLoader from "../../components/LottieLoader";
// import useAuth from "../../hooks/useAuth";
// import useRole from "../../hooks/useRole";

// export default function MyFavorites() {
//   const { user } = useAuth();
//   const { role, isPremium } = useRole();
//   // ================================
//   // 1) GET ALL USERS
//   // ================================
//   const { data: users = [] } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axios(`${import.meta.env.VITE_API_URL}/users`);
//       return res.data;
//     },
//   });

//   const currentUser = users.find((u) => u.email === user?.email);

//   // ================================
//   // 2) GET ALL PUBLIC LESSONS
//   // ================================
//   const { data: lessons = [], isLoading } = useQuery({
//     queryKey: ["favorite-lessons"],
//     queryFn: async () => {
//       const res = await axios(`${import.meta.env.VITE_API_URL}/public-lessons`);
//       return res.data;
//     },
//   });

//   // Lessons created by current user
// //   const myLessons = lessons.filter((l) => l.createdByEmail === user?.email);
//   // Total saved count (favorites)
//   const favoriteLessons = lessons.filter((l) =>
//     l.favorites?.includes(user?.email)
//   );

//   // Loading
//   if (isLoading) return <LottieLoader />;

//   return (
//     <div className="container mx-auto p-2">
//       <h3 className="text-2xl text-info font-bold my-6 uppercase">
//         My Favorites Lessons
//       </h3>
//       {/* TOP PROFILE CARD */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white shadow rounded-xl px-2 py-1 flex flex-col lg:flex-row gap-4 items-center mb-6"
//       >
//         {/* User Photo */}
//         <img
//           src={currentUser?.photoURL || "https://i.postimg.cc/3RdmcR6z/6.png"}
//           alt="Profile"
//           className="w-12 h-12 rounded-full border-1 border-blue-500 p-1"
//         />

//         {/* Info */}
//         <div className="flex items-center gap-4">
//           <h2 className="text-xl font-bold flex items-center gap-2">
//             {currentUser?.name}
//             {isPremium && (
//               <span className="px-3 py-1 bg-yellow-300 text-yellow-800 rounded-full text-xs font-semibold">
//                 ⭐ Premium
//               </span>
//             )}
//           </h2>

//           <p className="text-gray-600">{currentUser?.email}</p>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
//             <div className="px-2 bg-blue-100 rounded-lg text-center flex gap-2 items-center justify-center">
//               <p className="text-gray-600">My favorite lessons:</p>
//               <p className="text-xl font-bold">{favoriteLessons.length}</p>
//             </div>

//             <div className="px-2 bg-purple-100 rounded-lg text-center flex gap-2 items-center justify-center">
//               <p className="text-gray-600">Role:</p>
//               <p className="text-xl font-bold capitalize">{role}</p>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* MY LESSONS LIST */}

//       {favoriteLessons.length === 0 ? (
//         <p className="text-gray-500 text-center">
//           You haven't created any lessons yet.
//         </p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {favoriteLessons
//             .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//             .map((lesson) => (
//               <motion.div
//                 key={lesson._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 whileHover={{
//                   scale: 1.03,
//                   y: -5,
//                   boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
//                 }}
//                 className="bg-amber-100 rounded-lg overflow-hidden"
//               >
//                 {/* Image */}
//                 <img src={lesson.image} className="w-full h-36 object-cover" />

//                 <div className="p-3">
//                   <h4 className="font-semibold text-sm line-clamp-2">
//                     {lesson.title}
//                   </h4>
//                   <p className="text-xs text-gray-600 line-clamp-2 mt-1">
//                     {lesson.description}
//                   </p>
//                 </div>

//                 <div className="px-3 pb-3">
//                   <Link
//                     to={`/public-lessons/${lesson._id}`}
//                     className="btn btn-xs w-full hover:btn-warning"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </motion.div>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// }



import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LottieLoader from "../../components/LottieLoader";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

export default function MyFavorites() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState({ category: "", tone: "" });

  // 1️⃣ Fetch all public lessons
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["favorite-lessons"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/public-lessons`);
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
      await axios.patch(`${import.meta.env.VITE_API_URL}/details/favorite/${lessonId}`, {
        email: user.email,
      });
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
      <h2 className="text-3xl font-bold text-info mb-6 uppercase">My Favorite Lessons</h2>

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
                    <td className="py-3 px-4">{lesson.favorites?.length || 0}</td>
                    <td className="py-3 px-4 flex justify-center gap-2">
                      <Link
                        to={`/public-lessons/${lesson._id}`}
                        className="btn btn-sm btn-info hover:btn-secondary"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => removeFavoriteMutation.mutate(lesson._id)}
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
