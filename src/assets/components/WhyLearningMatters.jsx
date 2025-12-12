export default function WhyLearningMatters() {
  const items = [
    {
      title: "Real Experience",
      text: "Learn from real people's life journeys.",
    },
    {
      title: "Improve Decisions",
      text: "Better choices through shared wisdom.",
    },
    {
      title: "Avoid Mistakes",
      text: "Understand what others learned the hard way.",
    },
    {
      title: "Grow Faster",
      text: "Boost personal development with true stories.",
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Why Learning From Life Matters
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
