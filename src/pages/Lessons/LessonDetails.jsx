import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { FacebookShareButton, FacebookIcon } from "react-share";
import useAuth from "../../hooks/useAuth";
import LottieLoader from "../../components/LottieLoader";
import useRole from "../../hooks/useRole";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

const LessonDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  // console.log(user)
  const { isPremium, isRoleLoading } = useRole();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { loading } = useAuth();

  const [reportReason, setReportReason] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [commentText, setCommentText] = useState("");
  const axiosSecure = useAxiosSecure();

  //  Fetch single current Lesson
  const { data: lesson = {}, isLoading } = useQuery({
    queryKey: ["public-lesson", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/public-lessons/${id}`
      );
      return res.data;
    },
  });

  //  Fetch all lessons
  const { data: allLessons = [], isLoading: isAllLessonsLoading } = useQuery({
    queryKey: ["all-lessons"],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/all-lessons`);
      return result.data;
    },
  });

  //  Fetch creator
  const { data: creatorData = [], isLoading: isLoadingCreatorData } = useQuery({
    queryKey: ["creator-data"],
    queryFn: async () => {
      const result = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/users`);
      return result.data;
    },
  });

  // creator data
  const creator = creatorData.find(
    (user) => user?.email === lesson?.createdByEmail
  );

  const lessonsByCreator = allLessons.filter(
    (lesson) => lesson?.createdByEmail === creator?.email
  );
  // console.log(lessonsByCreator.length);

  const { data: similarLessons = [] } = useQuery({
    queryKey: ["similar-lessons", lesson.category, lesson.tone],
    enabled: !!lesson?.category && !!lesson?.tone,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/similar-lessons/${lesson.category}/${
          lesson.tone
        }`
      );
      return res.data;
    },
  });

  //  Like Handler
  const handleLike = async () => {
    if (!user) return navigate("/login");

    await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/details/like/${id}`, {
      email: user.email,
    });

    queryClient.invalidateQueries(["details", id]);
  };

  //  SAVE TO FAVORITES HANDLER
  const handleSave = async () => {
    if (!user) {
      toast.error("Please login to save lessons");
      return navigate("/login");
    }

    await axiosSecure.patch(
      `${import.meta.env.VITE_API_URL}/details/favorite/${id}`,
      {
        email: user.email,
      }
    );
    queryClient.invalidateQueries(["details", id]);
  };

  const handleReport = async () => {
    //  Confirmation popup
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to report this lesson?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Report",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });
    if (!result.isConfirmed) return;
    const payload = {
      lessonId: id,
      reporterName: user?.displayName,
      reporterEmail: user?.email,
      reason: reportReason,
      timestamp: new Date().toISOString(),
    };
    try {
      await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/lesson-reports`,
        payload
      );
      Swal.fire({
        title: "Reported!",
        text: "Your report has been submitted.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });
      setShowReport(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // fetch comments
  const { data: comments = [], refetch: refetchComments } = useQuery({
    queryKey: ["comments", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/all-lessons/${id}/comments`
      );
      return res.data;
    },
  });

  // Post Comment
  const handlePostComment = async () => {
    if (!user) {
      toast.error("Please login to comment");
      return navigate("/login");
    }

    if (!commentText.trim()) return toast.error("Comment cannot be empty");
    const payload = {
      name: user.displayName || "Anonymous",
      email: user.email,
      photo: user.photoURL,
      text: commentText,
    };
    await axiosSecure.post(
      `${import.meta.env.VITE_API_URL}/all-lessons/${id}/comment`,
      payload
    );
    setCommentText("");
    refetchComments();
    toast.success("Comment posted!");
  };

  if (
    loading ||
    isLoading ||
    isLoadingCreatorData ||
    isAllLessonsLoading ||
    isRoleLoading
  )
    return <LottieLoader />;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
      {/*  MAIN CONTENT */}
      <div className="md:col-span-2 space-y-6">
        {/*  Premium Lock */}
        {!user && !isPremium && (
          <div className="bg-yellow-100 border p-4 rounded text-center">
            This is a Premium Lesson
            <button
              onClick={() => navigate("/pricing")}
              className="btn btn-warning ml-3"
            >
              Upgrade Now
            </button>
          </div>
        )}

        {/*  Image */}
        <div className="relative">
          <img
            src={lesson?.image || "https://via.placeholder.com/600x400"}
            className={`w-full h-[350px] object-cover rounded ${
              !user && !isPremium && "blur-md"
            }`}
          />
        </div>

        {/*  Lesson Info */}
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        <p className={`text-gray-700 ${!user && !isPremium && "blur-md"}`}>
          {lesson.description}
        </p>

        {/*  Metadata */}
        <div className="flex gap-3 text-sm text-gray-500">
          <span>{lesson.category}</span>
          <span>{lesson.tone}</span>
          <span>Public</span>
          <span>⏱ 4 min read</span>
          <span>Created: {lesson.updatedAt}</span>
          <span>Updated: {lesson.updatedAt}</span>
        </div>

        {/*  Stats */}
        <div className="flex gap-4 text-sm">
          <span>Likes: {lesson.likes?.length || 0} </span>
          <span>Favorites: {lesson.favorites?.length || 0}</span>
          <span>Total view: {Math.floor(Math.random() * 10000)}</span>
        </div>

        {/*  Actions */}
        <div className="flex gap-3">
          <button onClick={handleLike} className="btn btn-sm">
            {lesson.likes?.includes(user?.email) ? <FaHeart /> : <FaRegHeart />}
            Like
          </button>

          <button onClick={handleSave} className="btn btn-sm">
            {lesson.favorites?.includes(user?.email) ? (
              <FaBookmark className="text-yellow-500" />
            ) : (
              <FaRegBookmark />
            )}
            Save
          </button>

          <button
            onClick={() => setShowReport(true)}
            className="btn btn-sm btn-error"
          >
            Report
          </button>

          <FacebookShareButton url={window.location.href}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>

        {/*  COMMENT SECTION */}
        <div className="border-t pt-6">
          <h3 className="font-bold mb-3">Comments ({comments.length})</h3>

          {/*  Input */}
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="textarea textarea-bordered w-full"
          ></textarea>

          <button
            onClick={handlePostComment}
            className="btn btn-sm mt-2 btn-primary"
          >
            Post Comment
          </button>

          {/*  Show All Comments */}
          <div className="mt-5 space-y-4">
            {comments.map((comment, index) => (
              <div key={index} className="bg-base-200 p-3 rounded flex gap-3">
                <img
                  src={comment.photo || "https://i.ibb.co/zZ9dp2Q/user.png"}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-sm">{comment.name}</h4>
                  <p className="text-sm">{comment.text}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*  AUTHOR CARD */}
      <div className="bg-base-200 p-4 rounded shadow space-y-2 flex flex-col  text-center">
        <h4 className="text-lg">
          Author Name:{" "}
          <span className=" text-accent font-bold uppercase">
            {creator.name}
          </span>
        </h4>
        <img
          src={creator?.photoURL || "https://i.ibb.co/zZ9dp2Q/user.png"}
          className="w-40 h-40 rounded-full mx-auto my-4"
        />
        {/* <h4 className="text-center font-bold">{lesson?.createdByEmail}</h4> */}
        <p className="text-center text-base">
          Total Lessons Created:{" "}
          <span className="badge badge-warning badge-lg font-bold">
            {" "}
            {lessonsByCreator.length}
          </span>
        </p>

        <span className="mt-4">
          <button
            onClick={() =>
              navigate("/profile", {
                state: {
                  lessons: lessonsByCreator,
                  author: creator,
                },
              })
            }
            className="btn btn-accent btn-sm uppercase"
          >
            View Author
          </button>
        </span>
      </div>

      {/*  SIMILAR LESSONS */}
      <div className="md:col-span-3 mt-10">
        <h3 className="text-xl font-bold mb-4">Related Lessons</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {similarLessons?.map((simLess) => (
            <div key={simLess._id} className="bg-base-200 rounded p-2">
              <img
                src={simLess.image}
                className="h-24 w-full object-cover rounded mb-2"
              />
              <p className="text-xs font-semibold line-clamp-2">
                {simLess.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/*  REPORT MODAL */}
      {showReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96 space-y-3">
            <h3 className="font-bold">Report Lesson</h3>

            <select
              onChange={(e) => setReportReason(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select Reason</option>
              <option>Inappropriate Content</option>
              <option>Hate Speech or Harassment</option>
              <option>Misleading Information</option>
              <option>Spam or Promotion</option>
              <option>Sensitive Content</option>
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowReport(false)} className="btn">
                Cancel
              </button>
              <button onClick={handleReport} className="btn btn-error">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonDetails;
