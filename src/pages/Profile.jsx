import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: user?.password || "",
  });

  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    register(formData);
    setSuccess("Profile updated successfully.");
  }

  return (
    <main>
      <h1>Edit Profile</h1>

      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit} className="form">
        <input
          name="firstName"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Save Profile</button>
      </form>
    </main>
  );
}

export default Profile;