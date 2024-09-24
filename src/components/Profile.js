import React from "react";

function Profiles({ profiles, onProfileChange }) {
  return (
    <div className="profiles">
      <h1>Select a profile</h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id} onClick={() => onProfileChange(profile.id)}>
            {profile.userId} {/* Измените на нужное поле для отображения имени профиля */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profiles;