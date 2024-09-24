import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Todo from "./Todos"; // Убедитесь, что путь правильный
import Profiles from "./Profile"; // Убедитесь, что путь правильный

function App() {
  const [selectedProfile, setSelectedProfile] = useState(() => {
    return localStorage.getItem("selectedProfile") || "";
  });
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [profiles, setProfiles] = useState([]); // Состояние для профилей

  const handleProfileChange = (profile) => {
    setSelectedProfile(profile);
    localStorage.setItem("selectedProfile", profile); // Сохраняем выбранный профиль
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users'); // Используйте правильный API для получения профилей
        const data = await response.json();
        setProfiles(data.users || []); // Убедитесь, что data.users содержит массив пользователей
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles(); // Получаем профили при загрузке
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      if (selectedProfile) {
        console.log("Fetching todos for profile:", selectedProfile); // Отладочный лог
        try {
          const response = await fetch(`https://dummyjson.com/todos/user/${selectedProfile}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log("Fetched todos:", data.todos); // Отладочный лог
          setTodos(data.todos || []); // Убедитесь, что устанавливаете пустой массив, если data.todos не определено
          setCurrentPage(1); // Сбрасываем страницу при смене профиля
        } catch (error) {
          console.error("Error fetching todos:", error);
          setTodos([]); // Очищаем список задач при ошибке
        }
      }
    };

    fetchTodos();
  }, [selectedProfile]);

  return (
    <Router>
      <nav>
        <Link to="/">Todo</Link>
        <Link to="/profiles">Profiles</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Todo todos={todos} currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
        <Route path="/profiles" element={<Profiles profiles={profiles} onProfileChange={handleProfileChange} />} />
      </Routes>
    </Router>
  );
}

export default App;