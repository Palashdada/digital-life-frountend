import { useEffect, useState } from "react";

export default function TopContributors() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/users")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.postsCount - a.postsCount);
        setUsers(sorted.slice(0, 5));
      });
  }, []);

  return (
    <section className="my-12 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">
        🏆 Top Contributors of the Week
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u) => (
          <div key={u._id} className="p-5 border rounded-lg shadow bg-white">
            <h3 className="font-semibold text-xl">{u.name}</h3>
            <p className="text-gray-600">Posts: {u.postsCount}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
