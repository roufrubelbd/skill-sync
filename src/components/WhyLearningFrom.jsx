export default function WhyLearningFrom() {
  const benefits = [
    {
      title: "Real-World Wisdom",
      desc: "Life experiences help you grow beyond theory, giving you practical wisdom you can apply instantly.",
    },
    {
      title: "Emotional Strength",
      desc: "Overcoming obstacles builds resilience, helping you handle future challenges with confidence.",
    },
    {
      title: "Better Decision-Making",
      desc: "Learning from past experiences helps you make wiser, more thoughtful decisions in the future.",
    },
    {
      title: "Personal Growth & Awareness",
      desc: "Understanding yourself through life lessons helps you grow, evolve, and become your best version.",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-accent mb-6">
        Why Learning From Life Matters
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {benefits.map((item, i) => (
          <div key={i} className="card bg-amber-100 shadow p-5 rounded-xl">
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-sm opacity-80">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
