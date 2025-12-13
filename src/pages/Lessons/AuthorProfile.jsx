import React from "react";
import { useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";


const AuthorProfile = () => {
  const location = useLocation();
  const data = location.state;
  const lessons = data.lessons;
  const author= data.author;
  const {loading} = useAuth()
  console.log(lessons, author);

   const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const card = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

   if (loading ) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="p-3 bg-white rounded-lg shadow animate-pulse"
            >
              <div className="h-36 bg-gray-200 rounded mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div className="mb-6 p-4"> 
 <div className="flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-6 my-6 lg:bg-amber-100 rounded-lg lg:py-2 lg:px-4 w-full lg:w-1/2 lg:mx-auto">
     <div>
        <img src={author.photoURL} className="w-12 h-12 rounded-full mx-auto bg-warning p-1" alt={author.name} />
     </div>
  <div>
    <span className="text-2xl">Author: <span className="font-bold text-accent uppercase">{author.name}</span></span>
  </div>
  <div>
    <span className="badge badge-warning badge-xl font-bold">Total lessons: {lessons.length}</span>
  </div>
 </div>
{/*  GRID */}
      <AnimatePresence>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {lessons.map((lesson) => {
            // const creator = creatorData.find(
            //   (user) => user.email === lesson.createdByEmail
            // );
            return (
              <motion.article
                key={lesson._id}
                variants={card}
                whileHover={{
                  scale: 1.03,
                  y: -6,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                }}
                className="bg-green-50 rounded-lg overflow-hidden p-2"
              >
                {/*  Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={lesson.image || "https://i.postimg.cc/zBVKcBMc/4.png"}
                    alt={lesson.title}
                    className="w-full rounded-lg h-36 object-cover transition-transform duration-500 hover:scale-105"
                  />

                  <span className="absolute top-2 left-2 text-xs px-2 py-1 rounded bg-white/80 font-semibold">
                    {lesson.accessLevel?.toUpperCase()}
                  </span>
                </div>

                {/*  Content */}
                <div className="p-3">
                  <h4 className="text-sm font-semibold line-clamp-2">
                    {lesson.title}
                  </h4>

                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {lesson.description}
                  </p>

                  <div className="my-1 flex justify-between text-xs text-gray-500">
                    <span className="px-1 py-1 bg-emerald-100 text-emerald-700 rounded">
                      {lesson.category}
                    </span>
                    <span className="px-1 py-1 bg-gray-100 rounded">
                      {lesson.tone}
                    </span>
                  </div>

                  <div className="pt-1 flex justify-start items-center text-xs text-gray-500 border-t border-gray-200">
                    <span className=" mr-2">
                      <img
                        className="w-7 h-7 rounded-full bg-blue-100 p-1"
                        src={author?.photoURL}
                        alt={author?.name}
                      />
                    </span>
                    <span>Created by: {author?.name}</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    <span>Created at: {lesson?.createdAt}</span>
                  </div>
                </div>

                {/*  Footer */}
                <div className="mx-4 md:mx-10 pb-2">
                  <Link
                    to={`/public-lessons/${lesson._id}`}
                    className="btn btn-xs btn-accent hover:btn-warning border border-gray-300 rounded-lg w-full"
                  >
                    View Details
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/*  Empty State */}
      {lessons.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No lessons found matching your filters.
        </p>
      )}

  </div>;
};

export default AuthorProfile;
