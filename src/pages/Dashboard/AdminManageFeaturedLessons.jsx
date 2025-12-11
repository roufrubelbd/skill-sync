import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";

const AdminManageFeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();

  // Load Featured Lessons
  const { data: featuredLessons = [], refetch: refetchFeatured } = useQuery({
    queryKey: ["featured-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-lessons");
      return res.data;
    },
  });

  //  Prevent non-admin users
  if (role !== "admin") {
    return (
      <div className="text-center text-red-500 mt-10 text-xl">
        Unauthorized Access
      </div>
    );
  }

  // Delete Featured Lesson
  const handleDeleteFeatured = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the lesson from featured section!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/featured-lessons/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Lesson removed from featured.", "success");
          refetchFeatured();
        }
      }
    });
  };

  return (
    <div className="w-full px-3 md:px-10 py-6">
      <h1 className="text-xl lg:text-3xl font-bold mb-5">Manage Featured Life Lessons</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {featuredLessons.map((item) => (
          <div
            key={item._id}
            className="card bg-base-100 shadow-xl border border-gray-200 rounded-xl"
          >
            <figure>
              <img
                src={item.image}
                alt="lesson"
                className="w-full h-30 object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="text-base">{item.title}</h2>
              <p className="text-sm opacity-60">{item.category}</p>

              <div className="card-actions justify-end">
                <button
                  onClick={() => handleDeleteFeatured(item._id)}
                  className="btn btn-error btn-xs w-full"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminManageFeaturedLessons;
