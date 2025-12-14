import { useEffect, useState } from "react";
import axios from "axios";

const ReportedLessons = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/reports`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setReports(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reported Lessons</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Lesson ID</th>
            <th className="border p-2">Reporter</th>
            <th className="border p-2">Reason</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r._id}>
              <td className="border p-2">{r.lessonId}</td>
              <td className="border p-2">{r.email}</td>
              <td className="border p-2">{r.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedLessons;
