import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import LottieLoader from "../../components/LottieLoader";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";

const UpdateLesson = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { role, isPremium, isRoleLoading } = useRole();

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [newImage, setNewImage] = useState(null);

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }/image/upload`;

  // Fetch existing lesson
  const { data: lesson = {}, isLoading } = useQuery({
    queryKey: ["update", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/update/${id}`
      );
      return res.data;
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target;

      // 🔥 PREMIUM VALIDATION
      if (!isPremium && form.accessLevel.value === "premium") {
        return Swal.fire({
          title: "Upgrade Required",
          text: "You must be a Premium user to set lessons as premium.",
          icon: "warning",
          confirmButtonText: "Go to Pricing",
        }).then(() => {
          navigate("/pricing");
        });
      }

      let imageUrl = lesson.image;

      // Upload new image if selected
      if (newImage) {
        const imageData = new FormData();
        imageData.append("file", newImage);
        imageData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );

        const imageRes = await axios.post(cloudinaryUrl, imageData);
        imageUrl = imageRes.data.secure_url;
      }

      const updatedLesson = {
        title: form.title.value,
        description: form.description.value,
        category: form.category.value,
        tone: form.tone.value,
        visibility: form.visibility.value,
        accessLevel: form.accessLevel.value,
        image: imageUrl,
        updatedAt: new Date().toISOString(),
      };

      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/update/${id}`,
        updatedLesson
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Lesson updated successfully.", "success");
        queryClient.invalidateQueries(["all-lessons"]);
        queryClient.invalidateQueries(["update", id]);

        // ⭐ ROLE-BASED REDIRECT
        if (role === "admin") {
          return navigate("/dashboard/admin/manage-lessons");
        } else {
          return navigate("/dashboard/update-lessons");
        }
      } else {
        Swal.fire("No changes made", res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Lesson update failed!");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || loading || isRoleLoading) return <LottieLoader />;

  return (
    <div className="container mx-auto pt-2">
      <div className="p-2 shadow rounded w-full md:w-3/5 lg:w-4/6 mx-auto">
        <h2 className="mb-3 text-2xl font-bold text-accent">Update Lesson</h2>

        <form onSubmit={handleUpdate} className="space-y-2">
          <input
            name="title"
            defaultValue={lesson.title}
            className="px-6 py-2 rounded-lg w-full bg-white"
            required
          />

          <input
            name="description"
            defaultValue={lesson.description}
            className="px-6 py-2 rounded-lg w-full bg-white"
            required
          />

          <select
            name="category"
            defaultValue={lesson.category}
            className="px-6 py-2 rounded-lg w-full bg-white"
            required
          >
            <option value="Personal Growth">Personal Growth</option>
            <option value="Mindset">Mindset</option>
            <option value="Relationships">Relationships</option>
            <option value="Career">Career</option>
          </select>

          <select
            name="tone"
            defaultValue={lesson.tone}
            className="px-6 py-2 rounded-lg w-full bg-white"
            required
          >
            <option value="Gratitude">Gratitude</option>
            <option value="Realization">Realization</option>
            <option value="Motivational">Motivational</option>
          </select>

          <select
            name="visibility"
            defaultValue={lesson.visibility}
            className="px-6 py-2 rounded-lg w-full bg-white"
            required
          >
            <option value="public">public</option>
            <option value="private">private</option>
          </select>

          <select
            name="accessLevel"
            defaultValue={lesson.accessLevel}
            className="px-6 py-2 rounded-lg w-full bg-white"
            required
          >
            <option value="free">free</option>
            <option value="premium">premium</option>
          </select>

          <input
            value={user?.email || ""}
            readOnly
            className="px-6 py-2 rounded-lg w-full bg-gray-200 text-gray-700"
          />

          <img
            src={lesson.image}
            alt="Lesson"
            className="w-full h-40 object-cover rounded"
          />

          <input
            type="file"
            onChange={(e) => setNewImage(e.target.files[0])}
            className="file-input file-input-bordered w-full"
          />

          <button type="submit" className="btn btn-warning rounded-full w-full">
            Update Lesson
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateLesson;
