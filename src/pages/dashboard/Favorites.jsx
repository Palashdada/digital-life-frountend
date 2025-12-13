// src/pages/dashboard/Favorites.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${user.uid}/favorites`
      );
      setFavorites(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) fetchFavorites();
  }, [user]);

  const removeFavorite = async (lessonId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/users/${
          user.uid
        }/favorites/${lessonId}`
      );
      Swal.fire("Removed", "Lesson removed from favorites", "success");
      fetchFavorites();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((lesson) => (
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
              <button
                onClick={() => removeFavorite(lesson._id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
