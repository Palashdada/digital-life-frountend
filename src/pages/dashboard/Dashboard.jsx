import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalLessons: 0,
    totalFavorites: 0,
    recentLessons: [],
  });

  useEffect(() => {
    if (!user) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/dashboard/stats/${user.uid}`)
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.displayName}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow p-4 rounded text-center">
          <h2 className="text-xl font-semibold">Total Lessons</h2>
          <p className="text-2xl mt-2">{stats.totalLessons}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <h2 className="text-xl font-semibold">Total Favorites</h2>
          <p className="text-2xl mt-2">{stats.totalFavorites}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <h2 className="text-xl font-semibold">Recently Added</h2>
          <p className="text-2xl mt-2">{stats.recentLessons.length}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Recently Added Lessons</h2>
        <ul className="space-y-2">
          {stats.recentLessons.map((lesson) => (
            <li
              key={lesson._id}
              className="border p-2 rounded hover:bg-gray-50"
            >
              {lesson.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
