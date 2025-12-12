import { useEffect, useState } from "react";

export default function MostSavedLessons() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/lessons")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => (b.favorites?.length || 0) - (a.favorites?.length || 0)
        );
        setLessons(sorted.slice(0, 6));
      });
  }, []);

  return (
    <section className="my-12 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">🔥 Most Saved Lessons</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((l) => (
          <div key={l._id} className="border rounded-lg p-4 shadow bg-white">
            <h3 className="font-semibold text-xl">{l.title}</h3>
            <p className="text-gray-600 mt-2">
              {l.description?.slice(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
