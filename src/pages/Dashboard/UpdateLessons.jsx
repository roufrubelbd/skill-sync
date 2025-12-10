import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import LottieLoader from "../../components/LottieLoader";
import { useParams } from "react-router";

const UpdateLessons = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [newImage, setNewImage] = useState(null);

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }/image/upload`;

  //  LOAD EXISTING LESSON
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
      let imageUrl = lesson.image;

      //  RE-UPLOAD IMAGE IF USER SELECTS NEW ONE
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
        title: e.target.title.value,
        description: e.target.description.value,
        category: e.target.category.value,
        tone: e.target.tone.value,
        visibility: e.target.visibility.value,
        accessLevel: e.target.accessLevel.value,
        image: imageUrl,
        updatedAt: new Date().toISOString(),
      };

      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/update/${id}`,
        updatedLesson
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Lesson updated successfully!");

        queryClient.invalidateQueries(["public-lessons"]);
        queryClient.invalidateQueries(["update", id]);
      } else {
        toast.error("No changes detected");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lesson update failed!");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || loading) return <LottieLoader />;

  return (
    <div className="container mx-auto pt-4">
      <div className="p-4 shadow rounded w-full md:w-3/5 lg:w-3/6 mx-auto">
        <h2 className="mb-3 text-2xl font-bold">Update Lesson</h2>

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

export default UpdateLessons;
