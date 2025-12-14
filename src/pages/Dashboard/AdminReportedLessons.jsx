import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LottieLoader from "../../components/LottieLoader";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const API_BASE = import.meta.env.VITE_API_URL;

export default function AdminReportedLessons() {
  const axiosSecure = useAxiosSecure();
  const {
    data: reported = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reported-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`${API_BASE}/reported-lessons`);
      return res.data;
    },
  });

  // Show list of reports inside a SweetAlert modal
  const openReportsModal = (lesson) => {
    const html = `
      <div style="max-height:400px;overflow:auto;text-align:left;">
        ${lesson.reports
          .map(
            (r) => `
          <div style="padding:10px;border:1px solid #ddd;margin-bottom:8px;border-radius:6px;">
            <p><strong>Reporter:</strong> ${r?.reporterName || "N/A"} — ${
              r.reporterEmail
            }</p>
            <p><strong>Reason:</strong> ${r.reason}</p>
            <p style="font-size:12px;color:#555">
              <strong>Time:</strong> ${new Date(r.timestamp).toLocaleString()}
            </p>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    Swal.fire({
      title: `Reports for "${lesson.title}"`,
      html,
      width: 650,
      confirmButtonText: "Close",
    });
  };

  // Ignore (Delete reports only)
  const handleIgnore = async (lessonId) => {
    const confirm = await Swal.fire({
      title: "Ignore all reports?",
      text: "Reports will be deleted but lesson will remain.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, ignore",
    });

    if (!confirm.isConfirmed) return;

    await axiosSecure.delete(`${API_BASE}/reported-lessons/${lessonId}/reports`);
    Swal.fire("Cleared", "All reports removed.", "success");
    refetch();
  };

  // Delete lesson + reports
  const handleDeleteLesson = async (lessonId) => {
    const confirm = await Swal.fire({
      title: "Delete lesson?",
      text: "This will permanently delete lesson + all reports.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    await axiosSecure.delete(`${API_BASE}/reported-lessons/${lessonId}/lesson`);
    Swal.fire("Deleted", "Lesson & its reports removed.", "success");
    refetch();
  };

  if (isLoading) return <LottieLoader />;

  return (
    <div className="p-4 lg:p-8">
      <h2 className="text-2xl font-bold mb-4 text-error">Reported Lessons</h2>

      {reported.length === 0 ? (
        <div className="p-8 text-center bg-base-200 rounded">
          No reported lessons found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-100">
            <thead className="bg-base-200">
              <tr>
                <th className="hidden lg:table-cell">Image</th>
                <th>Title</th>
                <th>Reports</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {reported.map((item) => (
                <tr key={item.lessonId}>
                  <td className="hidden lg:table-cell">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className="w-20 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-20 h-12 bg-gray-100 rounded flex items-center justify-center text-xs">
                        No image
                      </div>
                    )}
                  </td>

                  <td>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.category}</div>
                  </td>

                  <td>
                    <span className="badge badge-error">
                      {item.totalReports}
                    </span>
                  </td>

                  <td className="flex gap-2">
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => openReportsModal(item)}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() => handleIgnore(item.lessonId)}
                    >
                      Ignore
                    </button>

                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDeleteLesson(item.lessonId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
