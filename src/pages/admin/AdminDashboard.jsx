import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLessons: 0,
    reportedLessons: 0,
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          Total Users: {stats.totalUsers}
        </div>
        <div className="bg-white p-4 rounded shadow">
          Total Lessons: {stats.totalLessons}
        </div>
        <div className="bg-white p-4 rounded shadow">
          Reported Lessons: {stats.reportedLessons}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
