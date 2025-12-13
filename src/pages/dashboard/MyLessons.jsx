import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyLessons = () => {
  const { user } = useContext(AuthContext);
  const [lessons, setLessons] = useState([]);

  const fetchLessons = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/lessons/my/${user.uid}`
      );
      setLessons(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) fetchLessons();
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/lessons/${id}`);
        Swal.fire("Deleted!", "Your lesson has been deleted.", "success");
        fetchLessons(); // Refresh
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Lessons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson._id} className="bg-white shadow rounded p-4">
            <h3 className="font-semibold text-xl">{lesson.title}</h3>
            <p className="text-gray-600 mt-2">
              {lesson.description.slice(0, 100)}...
            </p>
            <div className="mt-4 flex justify-between items-center">
              <Link
                to={`/lessons/${lesson._id}`}
                className="text-blue-600 hover:underline"
              >
                View
              </Link>
              <Link
                to={`/update-lesson/${lesson._id}`}
                className="text-green-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(lesson._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLessons;
