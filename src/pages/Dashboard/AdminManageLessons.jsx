import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import LottieLoader from "../../components/LottieLoader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function AdminManageLessons() {
  const axiosSecure = useAxiosSecure();
  //   const queryClient = useQueryClient();

  const {
    data: lessons = [],
    isLoading,
    refetch: refetchAllLessons,
  } = useQuery({
    queryKey: ["all-lessons"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-lessons`
      );
      return res.data;
    },
  });

  // Add to Featured
  const handleAddFeatured = async (lesson) => {
    const payload = {
      lessonId: lesson._id,
      title: lesson.title,
      image: lesson.image,
      category: lesson.category,
    };
    const res = await axiosSecure.post("/featured-lessons", payload);
    if (res.data.insertedId) {
      Swal.fire("Added!", "Lesson added to featured list.", "success");
      //   refetchFeatured();
    } else {
      Swal.fire("Info", res.data.message, "info");
    }
  };

  // Delete Featured Lesson
  const handleDeleteLesson = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The action will remove the lesson!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/all-lessons/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Lesson removed ", "success");
          refetchAllLessons();
        }
      }
    });
  };

  if (isLoading) return <LottieLoader />;

  return (
    <div className="p-1 lg:p-8">
      <h2 className="text-xl md:text-2xl font-bold my-4 text-info">
        Manage Lessons
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full lg:border lg:border-gray-200 bg-base-100 lg:rounded-lg">
          <tbody className="lg:bg-base-200">
            <tr>
              <td className=" hidden  lg:table-cell">Image</td>
              <td>Title</td>
              <td className=" hidden  lg:table-cell">Category</td>
              <td className=" hidden  lg:table-cell">Tone</td>
              <td className="pl-20 lg:pl-0">Actions</td>
            </tr>
          </tbody>

          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id}>
                <td>
                  <img
                    src={lesson.image}
                    className="w-16 h-10 object-cover rounded hidden lg:table-cell"
                  />
                </td>

                <td className="lg:font-semibold">{lesson.title}</td>
                <td className="hidden lg:table-cell">{lesson.category}</td>
                <td className="hidden lg:table-cell">{lesson.tone}</td>

                <td className="flex flex-col lg:flex-row gap-1 lg:gap-2 justify-center">
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => handleAddFeatured(lesson)}
                  >
                    Feature
                  </button>
                  <Link
                    to={`/dashboard/update-lesson/${lesson._id}`}
                    className="btn btn-xs btn-warning"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDeleteLesson(lesson._id)}
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
