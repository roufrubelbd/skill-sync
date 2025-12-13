import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import LottieLoader from "../../components/LottieLoader";

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/analytics`
      );
      return res.data;
    },
  });

  if (isLoading) return <LottieLoader />;

  return (
    <div className="p-1 lg:p-6">
      <h1 className="text-3xl font-bold text-accent mb-6">
        Admin Dashboard Overview
      </h1>

      {/* TOP ANALYTICS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Users"
          value={data?.totalUsers}
          color="blue"
        />
        <DashboardCard
          title="Public Lessons"
          value={data?.totalPublicLessons}
          color="green"
        />
        <DashboardCard title="Total reported lessons" value={data?.totalReports} color="red" />
        <DashboardCard
          title="New Lessons Today"
          value={data?.todaysLessons}
          color="purple"
        />
      </div>

      {/* Most Active Contributors */}
      <div className="mt-10 bg-white shadow p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-info">Top Contributors</h2>

        <ul className="space-y-3">
          {data?.contributors.map((user) => (
            <li
              key={user._id}
              className="flex justify-between bg-base-200 p-3 rounded-lg"
            >
              <div>
                <p className="font-bold">{user.userData.name}</p>
                <p className="text-sm text-gray-600">{user._id}</p>
              </div>
              <span className="font-bold text-accent">
                {user.lessonCount} lessons
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* GROWTH CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <GrowthChart
          title="Lesson Growth (Last 7 Days)"
          data={data.lessonGrowth}
        />
        <GrowthChart title="User Growth (Last 7 Days)" data={data.userGrowth} />
      </div>
    </div>
  );
}

// ================================
// UI COMPONENTS
// ================================

function DashboardCard({ title, value, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
      className={`p-6 rounded-xl shadow bg-${color}-100 border-l-4 border-${color}-500`}
    >
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-3xl font-bold text-${color}-800">{value}</p>
    </motion.div>
  );
}

function GrowthChart({ title, data }) {
  const formatted = data.map((d) => ({
    date: d._id,
    count: d.count,
  }));

  return (
    <div className="bg-white shadow p-6 rounded-xl">
      <h3 className="font-bold text-lg mb-4">{title}</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={formatted}>
          <Line
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            strokeWidth={3}
          />
          <CartesianGrid stroke="#ddd" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
