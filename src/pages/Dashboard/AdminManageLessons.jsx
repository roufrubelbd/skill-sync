import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import LottieLoader from "../../components/LottieLoader";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AdminManageLessons() {
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterVisibility, setFilterVisibility] = useState("all");
  const [filterReviewed, setFilterReviewed] = useState("all");
  const axiosSecure = useAxiosSecure();

  // ================================
  // FETCH ALL LESSONS
  // ================================
  const {
    data: lessons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-all-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/all-lessons`
      );
      return res.data;
    },
  });

  // ====================
  // fetch all reported lessons
  //===================
    const { data, isLoading: isReportedLoading } = useQuery({
      queryKey: ["admin-analytics"],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `${import.meta.env.VITE_API_URL}/admin/analytics`
        );
        return res.data;
      },
    });
  

  // ================================
  // FILTERED LESSONS
  // ================================
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchCategory =
        filterCategory === "all" || lesson.category === filterCategory;

      const matchVisibility =
        filterVisibility === "all" ||
        lesson.visibility === filterVisibility;

      const matchReviewed =
        filterReviewed === "all" ||
        (filterReviewed === "reviewed" ? lesson.reviewed : !lesson.reviewed);

      return matchCategory && matchVisibility && matchReviewed;
    });
  }, [lessons, filterCategory, filterVisibility, filterReviewed]);

  // ================================
  // STATS
  // ================================
  const totalPublic = lessons.filter((l) => l.visibility === "public").length;
  const totalPrivate = lessons.filter((l) => l.visibility === "private").length;
  const totalReviewed = lessons.filter((l) => l.reviewed).length;
  const totalUnreviewed = lessons.filter((l) => !l.reviewed).length;

  // ================================
  // HANDLE DELETE
  // ================================
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete this lesson?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(
          `${import.meta.env.VITE_API_URL}/all-lessons/${id}`
        );

        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Lesson removed.", "success");
          refetch();
        }
      }
    });
  };

  // ================================
  // HANDLE FEATURE
  // ================================
  const handleFeature = async (lesson) => {
    const payload = {
      lessonId: lesson._id,
      title: lesson.title,
      image: lesson.image,
      category: lesson.category,
    };

    const res = await axiosSecure.post(
      `${import.meta.env.VITE_API_URL}/featured-lessons`,
      payload
    );

    if (res.data.insertedId) {
      Swal.fire("Success!", "Added to featured lessons.", "success");
    } else {
      Swal.fire("Info", res.data.message, "info");
    }
  };

  // ================================
  // HANDLE REVIEW TOGGLE
  // ================================
  const handleReviewToggle = async (lesson) => {
    const newStatus = !lesson.reviewed;

    const res = await axiosSecure.patch(
      `${import.meta.env.VITE_API_URL}/all-lessons/review/${lesson._id}`,
      { reviewed: newStatus }
    );

    if (res.data.modifiedCount > 0) {
      Swal.fire(
        "Updated!",
        `Lesson marked as ${newStatus ? "reviewed" : "unreviewed"}.`,
        "success"
      );
      refetch();
    }
  };

  if (isLoading || isReportedLoading) return <LottieLoader />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-info mb-4 uppercase">
        Manage Lessons 
      </h2>

      {/* ======================= STATS ======================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-6">
        <div className="p-4 bg-green-100 rounded-lg">
          <p className="text-2xl font-bold">{totalPublic}</p>
          <p className="text-sm text-gray-700 uppercase">Public Lessons</p>
        </div>
        <div className="p-4 bg-amber-100 rounded-lg">
          <p className="text-2xl font-bold">{totalPrivate}</p>
          <p className="text-sm text-gray-700 uppercase">Private Lessons</p>
        </div>
        <div className="p-4 bg-pink-100 rounded-lg">
          <p className="text-2xl font-bold">{data?.totalReports}</p>
          <p className="text-sm text-gray-700 uppercase">Reported Lessons</p>
        </div>
        <div className="p-4 bg-blue-100 rounded-lg">
          <p className="text-2xl font-bold">{totalReviewed}</p>
          <p className="text-sm text-gray-700 uppercase">Reviewed</p>
        </div>
        <div className="p-4 bg-purple-100 rounded-lg">
          <p className="text-2xl font-bold">{totalUnreviewed}</p>
          <p className="text-sm text-gray-700  uppercase">Needs Review</p>
        </div>
      </div>

      {/* ======================= FILTERS ======================= */}
      <div className="flex flex-wrap gap-3 mb-5">
        <select
          className="select select-bordered"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {[...new Set(lessons.map((l) => l.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered"
          value={filterVisibility}
          onChange={(e) => setFilterVisibility(e.target.value)}
        >
          <option value="all">All Visibility</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <select
          className="select select-bordered"
          value={filterReviewed}
          onChange={(e) => setFilterReviewed(e.target.value)}
        >
          <option value="all">All Review Status</option>
          <option value="reviewed">Reviewed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* ======================= TABLE ======================= */}
      <div className="overflow-x-auto">
        <table className="table w-full bg-base-100">
          <thead className="bg-base-200">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Visibility</th>
              <th>Reviewed</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLessons.map((lesson) => (
              <tr key={lesson._id}>
                <td>
                  <img
                    src={lesson.image}
                    className="w-16 h-12 rounded object-cover"
                  />
                </td>
                <td>{lesson.title}</td>
                <td>{lesson.category}</td>
                <td className="capitalize">{lesson.visibility}</td>
                <td>
                  {lesson.reviewed ? (
                    <span className="badge badge-success">Reviewed</span>
                  ) : (
                    <span className="badge badge-warning">Pending</span>
                  )}
                </td>

                <td className="flex flex-col lg:flex-row gap-2">
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => handleFeature(lesson)}
                  >
                    Feature
                  </button>

                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => handleReviewToggle(lesson)}
                  >
                    {lesson.reviewed ? "Unreview" : "Mark Reviewed"}
                  </button>

                  <Link
                    to={`/dashboard/update-lesson/${lesson._id}`}
                    className="btn btn-xs btn-warning"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(lesson._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
