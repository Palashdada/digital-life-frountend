import { useEffect, useState } from "react";
import axios from "axios";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/lessons`)
      .then((res) => setLessons(res.data));
  }, []);

  return (
    <div>
      <h2>Lessons</h2>
      {lessons.map((lesson) => (
        <div key={lesson._id}>
          <h4>{lesson.title}</h4>
          <p>{lesson.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Lessons;
