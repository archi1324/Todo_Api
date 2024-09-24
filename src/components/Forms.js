import React, { useState } from "react";

function Forms({ onAddProfile }) {
  const [newProfile, setNewProfile] = useState("");

  const handleInputChange = (e) => {
    setNewProfile(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProfile) {
      onAddProfile(newProfile); // Добавляем новый профиль через родительский обработчик
      setNewProfile(""); // Очищаем поле ввода
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newProfile}
        onChange={handleInputChange}
        placeholder="Enter new profile"
        required
      />
      <button type="submit">Add Profile</button>
    </form>
  );
}

export default Forms;