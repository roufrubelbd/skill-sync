import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import LottieLoader from "../../components/LottieLoader";
import useAuth from "../../hooks/useAuth";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { Link } from "react-router";

export default function UserDashboard() {
  const { user } = useAuth();

  // Fetch all public lessons
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["public-lessons"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/public-lessons`);
      return res.data;
    },
  });

  if (isLoading) return <LottieLoader />;

  // Filter lessons created by current user
  const myLessons = lessons.filter((l) => l.createdByEmail === user?.email);

  // Count saved (favorites)
  const savedCount = lessons.filter((l) =>
    l.favorites?.includes(user?.email)
  ).length;

  // Recently added lessons (latest 5)
  const recentLessons = myLessons
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // ================================
  // Prepare Weekly Contributions Chart
  // ================================
  const today = dayjs();
  const last7Days = Array.from({ length: 7 }).map((_, i) =>
    today.subtract(6 - i, "day")
  );

  const weeklyData = last7Days.map((day) => {
    const count = myLessons.filter(
      (lesson) =>
        dayjs(lesson.createdAt).format("YYYY-MM-DD") ===
        day.format("YYYY-MM-DD")
    ).length;
    return { date: day.format("MMM D"), count };
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-accent">User Dashboard</h1>

      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Lessons Created"
          value={myLessons.length}
          color="blue"
        />
        <DashboardCard title="Lessons Saved" value={savedCount} color="green" />
        <DashboardCard
          title="Recently Added"
          value={recentLessons.length}
          color="purple"
        />
        <DashboardCard title="Your Role" value="User" color="yellow" />
      </div>

      {/* Quick Shortcuts */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="flex gap-4 flex-wrap">
          <Link to="/dashboard/add-lesson">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn btn-primary"
          >
            Create New Lesson
          </motion.button>
          </Link>
          <Link to="/dashboard/my-lessons">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn btn-secondary"
          >
            View My Lessons
          </motion.button>
          </Link>
          <Link to="/dashboard/my-favorites">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn btn-accent"
          >
            Saved Lessons
          </motion.button>
          </Link>
        </div>
      </div>

      {/* Recent Lessons */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recently Added Lessons</h2>
        {recentLessons.length === 0 ? (
          <p className="text-gray-500">You haven't created any lessons yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recentLessons.map((lesson) => (
              <motion.div
                key={lesson._id}
                className="bg-base-200 rounded-lg overflow-hidden shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <img src={lesson.image} className="w-full h-36 object-cover" />
                <div className="p-3">
                  <h4 className="font-semibold text-sm line-clamp-2">
                    {lesson.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                    {lesson.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Weekly Contributions Chart */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Weekly Contributions</h2>
        {myLessons.length === 0 ? (
          <p className="text-gray-500">
            No lessons created in the last 7 days.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyData}>
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={3}
              />
              <CartesianGrid stroke="#ddd" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

// ================================
// Dashboard Card Component
// ================================
function DashboardCard({ title, value, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      className={`p-6 rounded-xl shadow bg-${color}-100 border-l-4 border-${color}-500`}
    >
      <p className="text-sm text-gray-600">{title}</p>
      <p className={`text-3xl font-bold text-${color}-800`}>{value}</p>
    </motion.div>
  );
}
