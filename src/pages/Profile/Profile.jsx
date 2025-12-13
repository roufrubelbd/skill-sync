import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useState } from "react";
import LottieLoader from "../../components/LottieLoader";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

export default function Profile() {
  const { user } = useAuth();
  const { role, isPremium } = useRole();

  const [newName, setNewName] = useState("");
  const [newPhoto, setNewPhoto] = useState("");

  // ================================
  // 1) GET ALL USERS
  // ================================
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/users`);
      return res.data;
    },
  });

  const currentUser = users.find((u) => u.email === user?.email);

  // ================================
  // 2) GET ALL PUBLIC LESSONS
  // ================================
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["my-lessons"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/public-lessons`);
      return res.data;
    },
  });

  // Lessons created by current user
  const myLessons = lessons.filter((l) => l.createdByEmail === user?.email);

  // Total saved count (favorites)
  const savedCount = lessons.filter((l) =>
    l.favorites?.includes(user?.email)
  ).length;

  // ================================
  // UPDATE PROFILE (name + photo)
  // ================================
  const handleUpdate = async () => {
    if (!newName && !newPhoto) return;

    const updateData = {
      ...(newName && { name: newName }),
      ...(newPhoto && { photoURL: newPhoto }),
    };

    await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/${user?.email}`,
      updateData
    );

    alert("Profile updated!");
  };

  // Loading placeholder
  if (isLoading) return <LottieLoader />;

  return (
    <div className="container mx-auto p-6">
      {/* TOP PROFILE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center"
      >
        {/* User Photo */}
        <img
          src={currentUser?.photoURL || "https://i.postimg.cc/3RdmcR6z/6.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-blue-500 p-1"
        />

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {currentUser?.name}
            {isPremium && (
              <span className="px-3 py-1 bg-yellow-300 text-yellow-800 rounded-full text-xs font-semibold">
                ⭐ Premium
              </span>
            )}
          </h2>

          <p className="text-gray-600">{currentUser?.email}</p>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div className="p-3 bg-blue-100 rounded-lg text-center">
              <p className="text-xl font-bold">{myLessons.length}</p>
              <p className="text-gray-600">Lessons Created</p>
            </div>

            <div className="p-3 bg-green-100 rounded-lg text-center">
              <p className="text-xl font-bold">{savedCount}</p>
              <p className="text-gray-600">Lessons Saved</p>
            </div>

            <div className="p-3 bg-purple-100 rounded-lg text-center">
              <p className="text-xl font-bold capitalize">{role}</p>
              <p className="text-gray-600">Role</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* UPDATE PROFILE SECTION */}
      <div className="bg-white shadow-md rounded-xl p-6 mt-6">
        <h3 className="font-bold text-lg mb-4">Update Profile</h3>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="New display name"
            className="input input-bordered w-full"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <input
            type="text"
            placeholder="New photo URL"
            className="input input-bordered w-full"
            value={newPhoto}
            onChange={(e) => setNewPhoto(e.target.value)}
          />

          <button onClick={handleUpdate} className="btn btn-primary">
            Save
          </button>
        </div>
      </div>

      <div className="my-8">
        {role === "admin" && (
          <>
            <div className="admin-activity-summary p-2 bg-white shadow rounded-md">
              <h2 className="text-2xl  my-2 uppercase text-info font-bold">
                Admin Activity Summary
              </h2>
              <p>
                A quick overview of moderation actions performed by
                administrators. Helps track platform health, measure workload,
                and maintain quality:
              </p>

              <div className="flex  justify-start gap-10 mt-4">
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <strong>Reported Lessons Moderated</strong>{" "}
                  </li>
                  <li>Manage Lessons</li>
                  <li>Manage Featured Lessons</li>
                  <li>Lessons Reviewed</li>
                  <li>Lessons deleted</li>
                  <li>Reports ignored</li>
                  <li>Lessons marked safe</li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <strong>User Management Actions:</strong>
                  </li>
                  <li>Users promoted</li>
                  <li>Users restricted</li>
                  <li>Users removed</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

      {/* MY LESSONS LIST */}
      <h3 className="text-xl font-bold mt-10 mb-4">Your Created Lessons</h3>

      {myLessons.length === 0 ? (
        <p className="text-gray-500 text-center">
          You haven't created any lessons yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {myLessons
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((lesson) => (
              <motion.div
                key={lesson._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                }}
                className="bg-base-200 rounded-lg overflow-hidden"
              >
                {/* Image */}
                <img src={lesson.image} className="w-full h-36 object-cover" />

                <div className="p-3">
                  <h4 className="font-semibold text-sm line-clamp-2">
                    {lesson.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                    {lesson.description}
                  </p>
                </div>

                <div className="px-3 pb-3">
                  <Link
                    to={`/public-lessons/${lesson._id}`}
                    className="btn btn-xs w-full"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
}
