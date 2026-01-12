import React from "react";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-accent">
        Contact Us
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Have questions or feedback? We'd love to hear from you.
      </p>

      <form className="bg-base-200 p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            rows="4"
            placeholder="Write your message..."
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <button className="btn btn-accent w-full">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
