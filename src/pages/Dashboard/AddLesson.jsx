import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import LottieLoader from "../../components/LottieLoader";
import { useQueryClient } from "@tanstack/react-query";

const AddLesson = () => {
  const { user } = useAuth();
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
      const imageFile = form.image.files[0];

      //  Upload Image to Cloudinary
      const imageData = new FormData();
      imageData.append("file", imageFile);
      imageData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const imageRes = await axios.post(cloudinaryUrl, imageData);
      const imageUrl = imageRes.data.secure_url;

      // Create Lesson Object (Your Schema)
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      //  Save to MongoDB
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-lesson`,
        newLesson
      );

      if (res.data?.acknowledged) {
        toast.success("Lesson added successfully!");

        //  REAL-TIME UI UPDATE
        queryClient.invalidateQueries(["public-lessons"]);

        form.reset();
      } else {
        toast.error("Lesson insert failed!");
      }
    } catch (error) {
      toast.error("Image upload or lesson save failed!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LottieLoader />;

  return (
    <div className="container mx-auto pt-4">
      <div className="p-4 shadow rounded w-full md:w-3/5 lg:w-3/6 mx-auto">
        <h2 className="mb-3 text-2xl font-bold">Add Lesson</h2>

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

          {/*  CATEGORY DROPDOWN */}
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

          {/*  TONE DROPDOWN */}
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

          {/*  VISIBILITY DROPDOWN */}
          <select
            name="visibility"
            required
            className="px-6 py-2 rounded-lg w-full bg-white"
          >
            <option value="">Select Visibility</option>
            <option value="public">public</option>
            <option value="private">private</option>
          </select>

          {/*  ACCESS LEVEL DROPDOWN */}
          <select
            name="accessLevel"
            required
            className="px-6 py-2 rounded-lg w-full bg-white"
          >
            <option value="">Select Access Level</option>
            <option value="free">free</option>
            <option value="premium">premium</option>
          </select>

          {/*  LOGGED USER EMAIL (READ ONLY) */}
          <input
            value={user?.email || ""}
            readOnly
            className="px-6 py-2 rounded-lg w-full bg-gray-200 text-gray-700"
          />

          {/*  IMAGE FILE UPLOAD */}
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
