import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          placeholder="Photo URL"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Update Profile
        </button>
      </form>
      {message && <p className="text-green-600 mt-2">{message}</p>}
    </div>
  );
};

export default AdminProfile;
