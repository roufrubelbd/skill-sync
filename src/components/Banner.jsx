import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import LottieLoader from "./LottieLoader";

const Banner = () => {
  const { loading } = useAuth();

  const slides = [
    {
      id: 1,
      image: "https://i.postimg.cc/zBVKcBMc/4.png",
      title: "Journey to Digital Excellence Here",
      subtitle:
        "Explore structured lessons and interactive learning experiences.",
    },
    {
      id: 2,
      image: "https://i.postimg.cc/mDtC5DqJ/5.png",
      title: "Master New Skills Anytime",
      subtitle: "From coding to creativity unlock premium content.",
    },
    {
      id: 3,
      image: "https://i.postimg.cc/3RdmcR6z/6.png",
      title: "Learn Smarter, Grow Faster",
      subtitle:
        "Access high-quality digital lessons built to upgrade your skills ",
    },
  ];

  if (loading) return <LottieLoader />;

  return (
    <div className="w-full md:h-[40vh] container mx-auto relative pt-4 pb-4">
      <Swiper
        modules={[ Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        effect="fade"
        loop
        className="rounded-2xl overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full overflow-hidden">
              <motion.img
                src={slide.image}
                alt={slide.title}
                className="w-full object-cover md:h-[40vh]"
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{
                  duration: 4,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-white/50 to-transparent"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-black-300">
                <motion.h2
                  className="text-base md:text-4xl font-bold md:mb-3 md:drop-shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  className="text-xs md:text-xl max-w-2xl mx-auto w-3/4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  {slide.subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <Link to="/public-lessons">
                    <button className="mt-2 btn btn-warning btn-xs md:btn-sm px-4 rounded-full shadow hover:shadow-emerald-400/40 transition-all duration-300 hover:btn-accent">
                      explore →
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
