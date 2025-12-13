import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const AddLesson = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    tone: "",
    image: "",
    visibility: "Public",
    accessLevel: "Free",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/lessons`, {
        ...form,
        creatorId: user.uid,
        creatorName: user.displayName,
      });
      Swal.fire("Success", "Lesson added successfully!", "success");
      setForm({
        title: "",
        description: "",
        category: "",
        tone: "",
        image: "",
        visibility: "Public",
        accessLevel: "Free",
      });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Lesson</h2>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Lesson Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Full Description / Story / Insight"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
          rows={5}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="tone"
          placeholder="Emotional Tone"
          value={form.tone}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="visibility"
          value={form.visibility}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
        <select
          name="accessLevel"
          value={form.accessLevel}
          onChange={handleChange}
          className="border p-2 rounded"
          disabled={false} // You can add premium check here
        >
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Lesson
        </button>
      </form>
    </div>
  );
};

export default AddLesson;
