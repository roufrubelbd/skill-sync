import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";
import LottieLoader from "../../components/LottieLoader";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyLessons = () => {
  const { user } = useAuth();
  const { isPremium } = useRole();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["my-lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/my-lessons?email=${user?.email}`
      );
      return res.data;
    },
  });

  // =========================
  // Toggle Visibility
  // =========================
  const handleToggleVisibility = async (lesson) => {
    // Proper string toggle
    const newVisibility = lesson.visibility === "public" ? "private" : "public";

    await axiosSecure.patch(
      `${import.meta.env.VITE_API_URL}/all-lessons/private/${lesson._id}`,
      { visibility: newVisibility }
    );

    queryClient.invalidateQueries(["my-lessons", user?.email]);
  };

  // =========================
  // Toggle Access Level
  // =========================
  const handleToggleAccess = async (lesson) => {
    if (!isPremium) {
      return Swal.fire({
        icon: "warning",
        title: "Premium Required",
        text: "Only premium users can change access level.",
        confirmButtonText: "Upgrade",
      }).then(() => {
        window.location.href = "/pricing";
      });
    }

    // Proper string toggle
    const newLevel = lesson.accessLevel === "free" ? "premium" : "free";

    await axiosSecure.patch(
      `${import.meta.env.VITE_API_URL}/all-lessons/premium/${lesson._id}`,
      { accessLevel: newLevel }
    );

    queryClient.invalidateQueries(["my-lessons", user?.email]);
  };

  // =========================
  // DELETE LESSON
  // =========================
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This lesson will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`${import.meta.env.VITE_API_URL}/all-lessons/${id}`);

        Swal.fire("Deleted!", "Your lesson has been removed.", "success");
        queryClient.invalidateQueries(["my-lessons"]);
      }
    });
  };

  if (isLoading) return <LottieLoader />;

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-3xl font-bold text-accent mb-4">My Lessons</h1>

      <div className="overflow-x-auto">
        <table className="table w-full bg-white border shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Visibility</th>
              <th>Access</th>
              <th>Stats</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id} className="hover:bg-gray-50">
                <td>
                  <img
                    src={lesson.image}
                    alt="thumb"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>

                <td>
                  <p className="font-semibold">{lesson.title}</p>
                  <p className="text-xs text-gray-500">{lesson.category}</p>
                  <p className="text-xs text-gray-400">
                    Created: {lesson.createdAt}
                  </p>
                </td>

                {/* Visibility Toggle */}
                <td>
                  <button
                    onClick={() => handleToggleVisibility(lesson)}
                    className={`btn btn-xs ${
                      lesson.visibility === "public"
                        ? "btn-success"
                        : "btn-outline"
                    }`}
                  >
                    {lesson.visibility}
                  </button>
                </td>

                {/* Access Level Toggle */}
                <td>
                  <button
                    onClick={() => handleToggleAccess(lesson)}
                    className={`btn btn-xs ${
                      lesson.accessLevel === "premium"
                        ? "btn-warning text-white"
                        : "btn-info"
                    }`}
                  >
                    {lesson.accessLevel}
                  </button>
                </td>

                {/* Stats */}
                <td>
                  <div className="text-sm">
                    <p>❤️ {lesson.likes?.length || 0} Likes</p>
                    <p>⭐ {lesson.favorites?.length || 0} Favorites</p>
                    <p>💬 {lesson.comments?.length || 0} Comments</p>
                  </div>
                </td>

                {/* Actions */}
                <td className="flex flex-col gap-2">
                  <Link
                    to={`/public-lessons/${lesson._id}`}
                    className="btn btn-xs btn-primary"
                  >
                    Details
                  </Link>

                  <Link
                    to={`/dashboard/update-lesson/${lesson._id}`}
                    className="btn btn-xs btn-warning text-white"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(lesson._id)}
                    className="btn btn-xs btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {lessons.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No lessons added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLessons;
