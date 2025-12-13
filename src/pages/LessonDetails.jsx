// src/pages/LessonDetails.jsx
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const LessonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [favorites, setFavorites] = useState(false);

  // Fetch lesson data
  const fetchLesson = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/lessons/${id}`
      );
      setLesson(res.data);

      // Check if user liked/favorited
      if (user) {
        setLiked(res.data.likes?.includes(user.uid));
        setFavorites(res.data.favorites?.includes(user.uid));
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/lessons/${id}/comments`
      );
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLesson();
    fetchComments();
  }, [id, user]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!lesson) return <p className="text-center mt-20">Lesson not found</p>;

  // Redirect free users for Premium lessons
  if (lesson.accessLevel === "Premium" && (!user || !user.isPremium)) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Premium Lesson 🔒</h2>
        <p className="mb-4">Upgrade to Premium to view this lesson.</p>
        <button
          onClick={() => navigate("/pricing")}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Upgrade to Premium
        </button>
      </div>
    );
  }

  // Like / Unlike
  const handleLike = async () => {
    if (!user) {
      Swal.fire("Login required", "Please login to like this lesson", "info");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/lessons/${id}/like`, {
        userId: user.uid,
      });
      setLiked(!liked);
      fetchLesson();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // Save / Remove from Favorites
  const handleFavorite = async () => {
    if (!user) {
      Swal.fire("Login required", "Please login to save this lesson", "info");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/lessons/${id}/favorite`,
        {
          userId: user.uid,
        }
      );
      setFavorites(!favorites);
      fetchLesson();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // Add Comment
  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire("Login required", "Please login to comment", "info");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/lessons/${id}/comments`,
        {
          userId: user.uid,
          comment,
        }
      );
      setComment("");
      fetchComments();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Lesson Title & Metadata */}
      <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
      <p className="text-gray-500 mb-4">
        By {lesson.creatorName} |{" "}
        {new Date(lesson.createdAt).toLocaleDateString()} | {lesson.category} |{" "}
        {lesson.tone}
      </p>

      {/* Featured Image */}
      {lesson.image && (
        <img
          src={lesson.image}
          alt={lesson.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}

      {/* Lesson Content */}
      <p className="mb-6">{lesson.description}</p>

      {/* Reactions */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleLike}
          className={`py-1 px-3 rounded ${
            liked ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          ❤️ {lesson.likes?.length || 0} Like
        </button>
        <button
          onClick={handleFavorite}
          className={`py-1 px-3 rounded ${
            favorites ? "bg-yellow-400" : "bg-gray-200"
          }`}
        >
          🔖 {lesson.favorites?.length || 0} Favorite
        </button>
      </div>

      {/* Comments Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Comments</h2>
        {user && (
          <form onSubmit={handleComment} className="flex gap-2 mb-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="border p-2 rounded flex-1"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Post
            </button>
          </form>
        )}
        {comments.length === 0 && <p>No comments yet.</p>}
        <ul>
          {comments.map((c) => (
            <li key={c._id} className="border-b py-2">
              <span className="font-semibold">{c.userName}: </span>
              {c.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LessonDetails;
