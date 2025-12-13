import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateProfile, updateEmail } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update displayName & photoURL
      await updateProfile(auth.currentUser, { displayName: name, photoURL });

      // Update email
      if (email !== user.email) {
        await updateEmail(auth.currentUser, email);
      }

      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (!user) return <p>Please login to view profile.</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2>My Profile</h2>
      {photoURL && (
        <img
          src={photoURL}
          alt="Profile"
          style={{ width: 100, borderRadius: "50%" }}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Photo URL:</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Update Profile
        </button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default Profile;
