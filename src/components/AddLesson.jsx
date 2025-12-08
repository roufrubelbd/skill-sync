import axios from "axios";
import React, { use, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../Spinner/Spinner";
import { AuthContext } from "../../main";

const AddLesson = () => {
  const { user, theme } = use(AuthContext);
  const [loading, setLoading] = useState(false);

  if (loading) return <Spinner />;

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const price = parseFloat(form.price.value);
    const originCountry = form.originCountry.value;
    const rating = parseFloat(form.rating.value);
    const availableQuantity = parseInt(form.availableQuantity.value);
    const category = form.category.value;

    const newProduct = {
      name,
      image,
      price,
      originCountry,
      rating,
      availableQuantity,
      category,
      userEmail: user?.email,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post(
        "https://assignment-10-server-rosy-seven.vercel.app/exports",
        newProduct
      );

      if (res.data.success) {
        toast.success("Product exported successfully!");
        form.reset();
        setLoading(false);
      } else {
        toast.error("Failed to export product");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error exporting product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`container mx-auto bg-base-300 mt-6 p-8 ${
        theme === "light"
          ? "bg-blue-100 border-blue-400"
          : "bg-gray-600 border-gray-600"
      }`}
    >
      <div className="p-8 shadow-lg rounded-lg w-full md:w-2/2 lg:w-2/5 mx-auto border">
        <h2 className="mb-4 text-2xl font-bold">Add Exports</h2>
        <div className="">
          <form onSubmit={handleAdd}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              required
              className={`px-6 py-2 mb-3 rounded-lg w-full ${
                theme === "light" ? "bg-white" : "bg-gray-100 text-gray-800"
              }`}
            />{" "}
            <br />
            <input
              type="text"
              name="image"
              placeholder="Product image url"
              required
              className={`px-6 py-2 mb-3 rounded-lg w-full ${
                theme === "light" ? "bg-white" : "bg-gray-100 text-gray-800"
              }`}
            />{" "}
            <br />
            <input
              type="number"
              name="price"
              placeholder="Price"
              required
              className={`px-6 py-2 mb-3 rounded-lg w-full ${
                theme === "light" ? "bg-white" : "bg-gray-100 text-gray-800"
              }`}
            />{" "}
            <br />
            <input
              type="text"
              name="originCountry"
              placeholder="Origin Country"
              required
              className={`px-6 py-2 mb-3 rounded-lg w-full ${
                theme === "light" ? "bg-white" : "bg-gray-100 text-gray-800"
              }`}
            />
            <br />
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              required
              className={`px-6 py-2 mb-3 rounded-lg w-full ${
                theme === "light" ? "bg-white" : "bg-gray-100 text-gray-800"
              }`}
            />{" "}
            <br />
            <input
              type="number"
              name="availableQuantity"
              placeholder="Available Quantity"
              required
              className={`px-6 py-2 mb-3 rounded-lg w-full ${
                theme === "light" ? "bg-white" : "bg-gray-100 text-gray-800"
              }`}
            />
            <br />
            <input
              type="text"
              name="category"
              placeholder="Category"
              required
              className={`px-6 py-2 mb-3 rounded-lg w-full ${
                theme === "light" ? "bg-white" : "bg-gray-100 text-gray-800"
              }`}
            />
            <br />
            <button
              className="btn btn-sm btn-outline rounded-full w-full font-bold"
              type="submit"
            >
              Add Export
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
