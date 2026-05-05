import { useState } from "react";
import { initialProjects } from "../data/projectsData";

const emptyForm = {
  title: "",
  clientName: "",
  serviceType: "Webdesign",
  price: "",
  status: "New",
  deadline: "",
  priority: "Medium",
  description: "",
};

function Dashboard() {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function validateForm() {
    if (
      !formData.title ||
      !formData.clientName ||
      !formData.price ||
      !formData.deadline ||
      !formData.description
    ) {
      setError("Please complete all required fields.");
      return false;
    }

    if (Number(formData.price) <= 0) {
      setError("Price must be greater than 0.");
      return false;
    }

    return true;
  }

  function handleSubmit() {
    setError("");

    if (!validateForm()) return;

    if (editingId) {
      const updatedProjects = projects.map((project) =>
        project.id === editingId
          ? { ...formData, id: editingId, price: Number(formData.price) }
          : project
      );

      setProjects(updatedProjects);
      setEditingId(null);
    } else {
      const newProject = {
        ...formData,
        id: Date.now(),
        price: Number(formData.price),
      };

      setProjects([...projects, newProject]);
    }

    setFormData(emptyForm);
    setShowForm(false);
  }

  function handleEdit(project) {
    setFormData(project);
    setEditingId(project.id);
    setShowForm(true);
    setError("");
  }

  function handleDeleteProject(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    setProjects(projects.filter((project) => project.id !== id));
  }

  function handleCancel() {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <button onClick={() => setShowForm(true)}>Add Project</button>

      {showForm && (
        <div className="form-card">
          <h2>{editingId ? "Edit Project" : "New Project"}</h2>

          {error && <p className="error-message">{error}</p>}

          <div className="form">
            <input
              name="title"
              placeholder="Project title"
              value={formData.title}
              onChange={handleChange}
            />

            <input
              name="clientName"
              placeholder="Client name"
              value={formData.clientName}
              onChange={handleChange}
            />

            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
            >
              <option>Webdesign</option>
              <option>Online Branding</option>
              <option>Büroservice</option>
              <option>Integration Consulting</option>
            </select>

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />

            <select name="status" value={formData.status} onChange={handleChange}>
              <option>New</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

            <input
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
            />

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <textarea
              name="description"
              placeholder="Project description"
              value={formData.description}
              onChange={handleChange}
            />

            <div className="button-row">
              <button onClick={handleSubmit}>
                {editingId ? "Update" : "Save"}
              </button>

              <button onClick={handleCancel} className="secondary-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <p>Total projects: {projects.length}</p>

      <div className="project-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <h2>{project.title}</h2>
            <p><strong>Client:</strong> {project.clientName}</p>
            <p><strong>Service:</strong> {project.serviceType}</p>
            <p><strong>Price:</strong> €{project.price}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Deadline:</strong> {project.deadline}</p>
            <p><strong>Priority:</strong> {project.priority}</p>
            <p>{project.description}</p>

            <div className="button-row">
              <button onClick={() => handleEdit(project)}>Edit</button>
              <button onClick={() => handleDeleteProject(project.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Dashboard;