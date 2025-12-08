import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaLock,
} from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";

/**
 * Replace this data with your real lessons source (API / props).
 * This is the 20-sample-data array you asked for (shortened keys for brevity).
 */
const SAMPLE_LESSONS = [
  {
    title: "Consistency Beats Motivation",
    description:
      "Motivation comes and goes, but consistent small actions produce long-term transformation. Build habits, not hype.",
    category: "Personal Growth",
    tone: "Motivational",
    image: "https://i.ibb.co/9T4PHsh/lesson1.jpg",
    visibility: "public",
    accessLevel: "free",
    createdByEmail: "alex.dev@example.com",
    likes: ["maria@example.com", "john@example.com"],
    favorites: ["john@example.com"],
    createdAt: "2025-01-10",
    updatedAt: "2025-01-10",
  },
  {
    title: "Learn Before You Earn",
    description:
      "Money grows when your skills grow. Invest in learning and your earning potential increases automatically.",
    category: "Career",
    tone: "Realization",
    image: "https://i.ibb.co/8NQkq6c/lesson2.jpg",
    visibility: "public",
    accessLevel: "premium",
    createdByEmail: "mentor.sam@example.com",
    likes: [],
    favorites: [],
    createdAt: "2025-01-12",
    updatedAt: "2025-01-12",
  },
  {
    title: "Your Network Is Your Net Worth",
    description:
      "Surround yourself with people who support your goals. The right environment accelerates your success.",
    category: "Relationships",
    tone: "Motivational",
    image: "https://i.ibb.co/t2fHfJq/lesson3.jpg",
    visibility: "public",
    accessLevel: "free",
    createdByEmail: "sara.growth@example.com",
    likes: ["lina@example.com"],
    favorites: [],
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01",
  },
  {
    title: "Learning to Say No",
    description:
      "Saying yes to everything destroys your time, energy, and boundaries. Protect your peace by saying no without guilt.",
    category: "Mindset",
    tone: "Realization",
    image: "https://i.ibb.co/7vF4gCt/lesson4.jpg",
    visibility: "public",
    accessLevel: "premium",
    createdByEmail: "coach.luis@example.com",
    likes: ["emily@example.com"],
    favorites: ["emily@example.com", "mark@example.com"],
    createdAt: "2025-02-04",
    updatedAt: "2025-02-04",
  },
  {
    title: "Failure Is a Better Teacher Than Success",
    description:
      "Every failure gives you a lesson that success often hides. Embrace it, analyze it, grow from it.",
    category: "Mindset",
    tone: "Realization",
    image: "https://i.ibb.co/jDSC4Cy/lesson5.jpg",
    visibility: "public",
    accessLevel: "free",
    createdByEmail: "mason.learning@example.com",
    likes: [],
    favorites: [],
    createdAt: "2025-02-05",
    updatedAt: "2025-02-05",
  },
  {
    title: "Time Is Your Most Valuable Currency",
    description:
      "Spend time wisely. Every minute invested in growth returns compounding rewards.",
    category: "Personal Growth",
    tone: "Motivational",
    image: "https://i.ibb.co/nLhB5qH/lesson6.jpg",
    visibility: "public",
    accessLevel: "premium",
    createdByEmail: "julia@example.com",
    likes: ["david@example.com"],
    favorites: [],
    createdAt: "2025-02-06",
    updatedAt: "2025-02-06",
  },
  {
    title: "Build Skills, Not Job Titles",
    description:
      "Job titles fade, but transferable skills stay with you forever. Focus on becoming valuable.",
    category: "Career",
    tone: "Motivational",
    image: "https://i.ibb.co/t398Kb9/lesson7.jpg",
    visibility: "public",
    accessLevel: "free",
    createdByEmail: "ethan@example.com",
    likes: [],
    favorites: [],
    createdAt: "2025-02-07",
    updatedAt: "2025-02-07",
  },
  {
    title: "Delayed Gratification Wins",
    description:
      "The ability to delay pleasure is one of the strongest predictors of long-term success.",
    category: "Mindset",
    tone: "Motivational",
    image: "https://i.ibb.co/6ZW7PMy/lesson8.jpg",
    visibility: "public",
    accessLevel: "premium",
    createdByEmail: "mentor.rachel@example.com",
    likes: ["jason@example.com"],
    favorites: [],
    createdAt: "2025-02-08",
    updatedAt: "2025-02-08",
  },
  {
    title: "Kindness Is Strength, Not Weakness",
    description:
      "Kindness builds trust, respect, and long-lasting relationships. It is a silent form of leadership.",
    category: "Relationships",
    tone: "Gratitude",
    image: "https://i.ibb.co/v1PpHY0/lesson9.jpg",
    visibility: "public",
    accessLevel: "free",
    createdByEmail: "hana@example.com",
    likes: ["sami@example.com"],
    favorites: [],
    createdAt: "2025-02-10",
    updatedAt: "2025-02-10",
  },
  {
    title: "Focus on Progress, Not Perfection",
    description:
      "Perfection kills productivity. Progress — even small — creates momentum for bigger achievements.",
    category: "Personal Growth",
    tone: "Motivational",
    image: "https://i.ibb.co/K00RtCm/lesson10.jpg",
    visibility: "public",
    accessLevel: "free",
    createdByEmail: "leo@example.com",
    likes: ["sam@example.com"],
    favorites: [],
    createdAt: "2025-02-14",
    updatedAt: "2025-02-14",
  },
  {
    title: "Every Skill Starts as a Bad Skill",
    description:
      "The beginners who keep going become the experts. Being bad at something is the first step to being good.",
    category: "Personal Growth",
    tone: "Realization",
    image: "https://i.ibb.co/whdszXw/lesson11.jpg",
    visibility: "public",
    accessLevel: "premium",
    createdByEmail: "coach.emma@example.com",
    likes: [],
    favorites: [],
    createdAt: "2025-02-15",
    updatedAt: "2025-02-15",
  },
  {
    title: "Stop Comparing Your Chapter 1 to Someone’s Chapter 20",
    description:
      "Comparison kills confidence. Everyone grows at their own pace — embrace your journey.",
    category: "Mindset",
    tone: "Gratitude",
    image: "https://i.ibb.co/4VBf7hp/lesson12.jpg",
    visibility: "public",
    accessLevel: "free",
    createdByEmail: "nina@example.com",
    likes: ["ray@example.com"],
    favorites: [],
    createdAt: "2025-02-18",
    updatedAt: "2025-02-18",
  },
  {
    title: "Feedback Is Not an Attack",
    description:
      "Constructive criticism accelerates your growth. Learn to separate emotion from improvement.",
    category: "Career",
    tone: "Realization",
    image: "https://i.ibb.co/Zx5TJmV/lesson13.jpg",
    visibility: "public",
    accessLevel: "premium",
    createdByEmail: "mentor.ian@example.com",
    likes: [],
    favorites: [],
    createdAt: "2025-02-20",
    updatedAt: "2025-02-20",
  },
  {
    title: "What You Allow Will Continue",
    description:
      "If you allow disrespect, it grows. If you allow poor habits, they multiply. Set boundaries early.",
    category: "Mindset",
    tone: "Realization",
    image: "https://i.ibb.co/L09qp9B/lesson14.jpg",
    visibility: "public",
    accessLevel: "free",
    createdByEmail: "alina@example.com",
    likes: ["jack@example.com"],
    favorites: [],
    createdAt: "2025-02-21",
    updatedAt: "2025-02-21",
  },
  {
    title: "You Don’t Need More Time — You Need More Focus",
    description:
      "Most people are not time-poor, they are focus-poor. Concentration is a superpower.",
    category: "Personal Growth",
    tone: "Motivational",
    image: "https://i.ibb.co/VmvK6Pq/lesson15.jpg",
    visibility: "public",
    accessLevel: "premium",
    createdByEmail: "josh@example.com",
    likes: [],
    favorites: [],
    createdAt: "2025-02-22",
    updatedAt: "2025-02-22",
  },
  {
    title: "Listen More Than You Speak",
    description:
      "Listening reveals opportunities, builds empathy, and strengthens relationships.",
    category: "Relationships",
    tone: "Gratitude",
    image: "https://i.ibb.co/VpQWzNL/lesson16.jpg",
    visibility: "public",
    accessLevel: "free",
    createdByEmail: "ravi@example.com",
    likes: [],
    favorites: [],
    createdAt: "2025-02-25",
    updatedAt: "2025-02-25",
  },
  {
    title: "Start Before You Feel Ready",
    description:
      "Most dreams die because people wait for the perfect moment. Action creates clarity.",
    category: "Mindset",
    tone: "Motivational",
    image: "https://i.ibb.co/LJkDNkR/lesson17.jpg",
    visibility: "public",
    accessLevel: "free",
    createdByEmail: "maria@example.com",
    likes: [],
    favorites: [],
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01",
  },
  {
    title: "Energy Is More Important Than Time",
    description:
      "You can have plenty of hours but no energy. Protect your physical and mental energy.",
    category: "Personal Growth",
    tone: "Realization",
    image: "https://i.ibb.co/N22qQb4/lesson18.jpg",
    visibility: "public",
    accessLevel: "premium",
    createdByEmail: "trainer.kyle@example.com",
    likes: [],
    favorites: [],
    createdAt: "2025-03-02",
    updatedAt: "2025-03-02",
  },
  {
    title: "Your Future Is Built by Today’s Choices",
    description:
      "Every small decision shapes your future self. Choose actions that move you forward.",
    category: "Personal Growth",
    tone: "Motivational",
    image: "https://i.ibb.co/N7svY37/lesson19.jpg",
    visibility: "public",
    accessLevel: "free",
    createdByEmail: "diana@example.com",
    likes: [],
    favorites: [],
    createdAt: "2025-03-05",
    updatedAt: "2025-03-05",
  },
  {
    title: "You Become What You Repeatedly Do",
    description:
      "Your habits shape your identity. Excellence is not an act, but a habit practiced over time.",
    category: "Personal Growth",
    tone: "Motivational",
    image: "https://i.ibb.co/9sF5pMm/lesson20.jpg",
    visibility: "public",
    accessLevel: "premium",
    createdByEmail: "mentor.zoe@example.com",
    likes: [],
    favorites: [],
    createdAt: "2025-03-06",
    updatedAt: "2025-03-06",
  },
];

/**
 * Utility: format date nicely
 */
const niceDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch {
    return iso;
  }
};

export default function Lessons() {
  // simulate current user (hook this to real auth)
  const [currentUser] = useState({
    email: "you@example.com",
    isPremium: false,
  });

  // UI state
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [tone, setTone] = useState("All");
  const [sort, setSort] = useState("newest"); // newest | access
  const [selected, setSelected] = useState(null); // selected lesson for modal

  // simulate likes/favorites locally
  const [localLikes, setLocalLikes] = useState(() =>
    SAMPLE_LESSONS.reduce((acc, lesson) => {
      acc[lesson.title] = new Set(lesson.likes || []);
      return acc;
    }, {})
  );
  const [localFavs, setLocalFavs] = useState(() =>
    SAMPLE_LESSONS.reduce((acc, lesson) => {
      acc[lesson.title] = new Set(lesson.favorites || []);
      return acc;
    }, {})
  );

  // derive unique categories & tones
  const categories = useMemo(
    () => ["All", ...new Set(SAMPLE_LESSONS.map((l) => l.category))],
    []
  );
  const tones = useMemo(
    () => ["All", ...new Set(SAMPLE_LESSONS.map((l) => l.tone))],
    []
  );

  // filtering
  const filtered = useMemo(() => {
    let list = SAMPLE_LESSONS.filter((l) => l.visibility === "public");
    if (category !== "All") list = list.filter((l) => l.category === category);
    if (tone !== "All") list = list.filter((l) => l.tone === tone);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.createdByEmail.toLowerCase().includes(q)
      );
    }
    if (sort === "newest") {
      list = list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === "access") {
      // show free first then premium
      list = list.sort((a, b) =>
        a.accessLevel === b.accessLevel ? 0 : a.accessLevel === "free" ? -1 : 1
      );
    }
    return list;
  }, [category, tone, query, sort]);

  // toggle like / favorite
  const toggleLike = (lesson) => {
    setLocalLikes((prev) => {
      const next = { ...prev, [lesson.title]: new Set(prev[lesson.title]) };
      const set = next[lesson.title];
      if (set.has(currentUser.email)) set.delete(currentUser.email);
      else set.add(currentUser.email);
      return next;
    });
  };
  const toggleFav = (lesson) => {
    setLocalFavs((prev) => {
      const next = { ...prev, [lesson.title]: new Set(prev[lesson.title]) };
      const set = next[lesson.title];
      if (set.has(currentUser.email)) set.delete(currentUser.email);
      else set.add(currentUser.email);
      return next;
    });
  };

  // animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };
  const card = {
    hidden: { opacity: 0, y: 18, scale: 0.995 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    hover: {
      scale: 1.02,
      y: -6,
      boxShadow: "0px 12px 30px rgba(16,24,40,0.12)",
    },
  };

  return (
    <section className="container mx-auto px-4 py-12 text-xs">
      {/* Header / Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700">
          Digital Life Lessons
        </h2>

        <div className="flex gap-3 items-center w-full md:w-auto">
          {/* Search */}
          <label className="relative flex items-center w-full md:w-72">
            <HiOutlineSearch
              className="absolute left-3 text-gray-400"
              size={20}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lessons, author or keywords..."
              className="input input-bordered pl-10 pr-3 w-full"
            />
          </label>

          {/* Filters */}
          <select
            className="select select-bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            {tones.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-36"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="access">Free first</option>
          </select>
        </div>
      </div>

      {/* Live Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <AnimatePresence>
          {filtered.map((lesson) => {
            const likesSet =
              localLikes[lesson.title] || new Set(lesson.likes || []);
            const favSet =
              localFavs[lesson.title] || new Set(lesson.favorites || []);
            const liked = likesSet.has(currentUser.email);
            const fav = favSet.has(currentUser.email);
            const isLocked =
              lesson.accessLevel === "premium" && !currentUser.isPremium;

            return (
              <motion.article
                key={lesson.title}
                variants={card}
                whileHover="hover"
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: 10 }}
                className="bg-white rounded-xl overflow-hidden border text-xs"
                layout
              >
                <div className="relative text-xs">
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-full h-40 object-cover"
                    onClick={() => setSelected(lesson)}
                  />

                  {/* Premium overlay */}
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="flex items-center justify-center gap-2 mb-2 text-xs">
                          <FaLock />
                          <span className="font-medium">Premium Lesson</span>
                        </div>
                        <button
                          className="btn btn-sm btn-primary btn-outline"
                          onClick={() => alert("Go to pricing/upgrade flow")}
                        >
                          Upgrade to View
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 text-xs">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {lesson.category} • {lesson.tone} •{" "}
                        {niceDate(lesson.createdAt)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleLike(lesson)}
                          className="text-red-500 hover:text-red-600"
                          aria-label="like"
                        >
                          {liked ? <FaHeart /> : <FaRegHeart />}
                        </button>
                        <span className="text-sm text-gray-600">
                          {(localLikes[lesson.title] || new Set()).size}
                        </span>
                      </div>

                      <div>
                        <button
                          onClick={() => toggleFav(lesson)}
                          className="text-amber-600 hover:text-amber-700"
                          aria-label="favorite"
                        >
                          {fav ? <FaBookmark /> : <FaRegBookmark />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mt-3 line-clamp-3">
                    {lesson.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="badge badge-outline">
                      {lesson.accessLevel.toUpperCase()}
                    </span>
                    <span className="badge badge-ghost">
                      {lesson.createdByEmail}
                    </span>
                    <span className="badge badge-info">{lesson.tone}</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      className="btn btn-sm btn-accent"
                      onClick={() => setSelected(lesson)}
                      aria-label="View details"
                    >
                      View Details
                    </button>
                    <div className="text-xs text-gray-500">
                      Est. read{" "}
                      {Math.ceil(lesson.description.split(" ").length / 200)}{" "}
                      min
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Details modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden"
              initial={{ y: 30, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 p-4 border-b text-xs">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">
                    {selected.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selected.category} • {selected.tone} •{" "}
                    {niceDate(selected.createdAt)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    className="btn btn-ghost"
                    onClick={() => toggleLike(selected)}
                  >
                    {(localLikes[selected.title] || new Set()).has(
                      currentUser.email
                    ) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                  <button
                    className="btn btn-ghost"
                    onClick={() => toggleFav(selected)}
                  >
                    {(localFavs[selected.title] || new Set()).has(
                      currentUser.email
                    ) ? (
                      <FaBookmark className="text-amber-600" />
                    ) : (
                      <FaRegBookmark />
                    )}
                  </button>
                  <button
                    className="btn btn-ghost"
                    onClick={() => setSelected(null)}
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-6 text-xs">
                <div>
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-64 object-cover rounded-lg shadow"
                  />
                </div>
                <div>
                  <p className="text-gray-700 mb-4 whitespace-pre-line">
                    {selected.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Lesson Info</h4>
                    <ul className="text-sm text-gray-600">
                      <li>
                        Visibility:{" "}
                        <strong className="ml-2">{selected.visibility}</strong>
                      </li>
                      <li>
                        Access:{" "}
                        <strong className="ml-2">{selected.accessLevel}</strong>
                      </li>
                      <li>
                        Creator:{" "}
                        <strong className="ml-2">
                          {selected.createdByEmail}
                        </strong>
                      </li>
                      <li>
                        Created:{" "}
                        <strong className="ml-2">
                          {niceDate(selected.createdAt)}
                        </strong>
                      </li>
                    </ul>
                  </div>

                  {selected.accessLevel === "premium" &&
                    !currentUser.isPremium && (
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                        <div className="flex items-center gap-3">
                          <FaLock className="text-yellow-600" />
                          <div>
                            <div className="font-semibold">Premium lesson</div>
                            <div className="text-sm text-gray-600">
                              Upgrade to Premium to view the full content.
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              alert("redirect to pricing/checkout")
                            }
                          >
                            Upgrade to Premium
                          </button>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
