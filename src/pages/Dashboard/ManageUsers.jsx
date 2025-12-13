import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const API = import.meta.env.VITE_API_URL;

export default function ManageUsers() {
  const [search, setSearch] = useState("");

  // Fetch users (with search)
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axios.get(`${API}/admin/search-users?q=${search}`);
      return res.data;
    },
  });

  // Promote User
  const handlePromote = async (email) => {
    const confirm = await Swal.fire({
      title: "Promote to Admin?",
      text: `User: ${email}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Promote",
    });

    if (!confirm.isConfirmed) return;

    await axios.patch(`${API}/admin/users/${email}/role`);

    Swal.fire("Success!", "User promoted to admin.", "success");
    refetch();
  };

  // Delete User
  const handleDelete = async (email) => {
    const confirm = await Swal.fire({
      title: "Delete Account?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    await axios.delete(`${API}/admin/users/${email}`);

    Swal.fire("Deleted!", "User account removed.", "success");
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-accent mb-4">Manage Users</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        className="input input-bordered w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-accent">
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Total Lessons</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, idx) => (
              <tr key={u._id}>
                <td>{idx + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span
                    className={`badge ${
                      u.role === "admin" ? "badge-warning" : "badge-info"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td>{u.totalLessons || 0}</td>

                <td className="flex gap-2">
                  {u.role !== "admin" && (
                    <button
                      onClick={() => handlePromote(u.email)}
                      className="btn btn-xs btn-accent"
                    >
                      Promote
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(u.email)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
