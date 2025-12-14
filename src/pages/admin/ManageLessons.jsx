import { useEffect, useState } from "react";
import axios from "axios";

const ManageLessons = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/lessons`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setLessons(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Lessons</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Creator</th>
            <th className="border p-2">Access Level</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((l) => (
            <tr key={l._id}>
              <td className="border p-2">{l.title}</td>
              <td className="border p-2">{l.creatorName}</td>
              <td className="border p-2">{l.accessLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageLessons;
