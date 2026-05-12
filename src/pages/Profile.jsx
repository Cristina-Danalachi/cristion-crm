import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.firstName.trim()) {
      setError("First name is required.");
      return;
    }

    if (!formData.lastName.trim()) {
      setError("Last name is required.");
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password && formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    register({
      ...user,
      ...formData,
      password: formData.password || user.password,
    });

    setSuccess("Profile updated successfully.");
  }

  return (
    <main>
      <h1>Edit Profile</h1>

      {error && <p className="error-message">{error}</p>}
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
          type="password"
          placeholder="New password (optional)"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Save Profile</button>
      </form>
    </main>
  );
}

export default Profile;