import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import LottieLoader from "../../components/LottieLoader";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";
import { useNavigate } from "react-router";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const AddLesson = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isPremium, isRoleLoading } = useRole();

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }/image/upload`;

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target;
      const accessLevel = form.accessLevel.value;

      //  Block free users from creating premium lessons
      if (!isPremium && accessLevel === "premium") {
        setLoading(false);
        return Swal.fire({
          title: "Upgrade Required",
          text: "You must be a Premium user to create premium lessons.",
          icon: "warning",
          confirmButtonText: "Upgrade Now",
        }).then(() => navigate("/pricing"));
      }

      const imageFile = form.image.files[0];

      // Upload Image
      const imgData = new FormData();
      imgData.append("file", imageFile);
      imgData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const imgRes = await axios.post(cloudinaryUrl, imgData);
      const imageUrl = imgRes.data.secure_url;

      const newLesson = {
        title: form.title.value,
        description: form.description.value,
        category: form.category.value,
        tone: form.tone.value,
        visibility: form.visibility.value,
        accessLevel: form.accessLevel.value,
        image: imageUrl,
        createdByEmail: user?.email,
        likes: [],
        favorites: [],
        comments: [],
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
      };

      // Save to DB
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-lesson`,
        newLesson
      );

      if (res.data?.acknowledged) {
        // toast.success("Lesson added successfully!");
        Swal.fire("Success", "Your lesson has been added.", "success");
        queryClient.invalidateQueries(["all-lessons"]);
        form.reset();
      } else {
        toast.error("Error adding lesson.");
      }
    } catch (error) {
      toast.error("Error uploading image or saving lesson.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || isRoleLoading) return <LottieLoader />;

  return (
    <div className="container mx-auto pt-4">
      <div className="p-2 md:p-4 shadow rounded border border-gray-200 w-full md:w-4/5 lg:w-4/6 mx-auto">
        <h2 className="mb-3 text-2xl font-bold text-accent">Add Lesson</h2>

        <form onSubmit={handleAdd} className="space-y-2">
          <input
            name="title"
            placeholder="Lesson title"
            required
            className="px-6 py-2 rounded-lg w-full bg-white"
          />

          <input
            name="description"
            placeholder="Lesson description"
            required
            className="px-6 py-2 rounded-lg w-full bg-white"
          />

          <select
            name="category"
            required
            className="px-6 py-2 rounded-lg w-full bg-white"
          >
            <option value="">Select Category</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Mindset">Mindset</option>
            <option value="Relationships">Relationships</option>
            <option value="Career">Career</option>
          </select>

          <select
            name="tone"
            required
            className="px-6 py-2 rounded-lg w-full bg-white"
          >
            <option value="">Select Tone</option>
            <option value="Gratitude">Gratitude</option>
            <option value="Realization">Realization</option>
            <option value="Motivational">Motivational</option>
          </select>

          <select
            name="visibility"
            required
            className="px-6 py-2 rounded-lg w-full bg-white"
          >
            <option value="">Select Visibility</option>
            <option value="public">public</option>
            <option value="private">private</option>
          </select>

          {/* ⭐ Access Level — Free users CAN SEE premium option, but blocked on submit */}
          {/* <select
            name="accessLevel"
            required
            className="px-6 py-2 rounded-lg w-full bg-white"
          >
            <option value="">Select Access Level</option>
            <option value="free">free</option>

            <option title="tile" value="premium" disabled={!isPremium}>
              premium
            </option>
          </select> */}
          <select name="accessLevel" className="w-full">
            <option value="">Select Access Level</option>

            <option value="free">Free</option>

            <Tippy
              content="Upgrade to Premium to create premium lessons"
              disabled={isPremium}
            >
              <option value="premium" disabled={!isPremium}>
                Premium
              </option>
            </Tippy>
          </select>

          <input
            value={user?.email || ""}
            readOnly
            className="px-6 py-2 rounded-lg w-full bg-gray-200 text-gray-700"
          />

          <input
            type="file"
            name="image"
            required
            className="file-input file-input-bordered w-full"
          />

          <button
            className="btn btn-warning rounded-full w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Lesson"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
