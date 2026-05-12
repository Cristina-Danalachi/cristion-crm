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
  const [searchTerm, setSearchTerm] = useState("");

  const activeProjects = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const totalRevenue = projects.reduce((sum, project) => {
    return sum + (Number(project.price) || 0);
  }, 0);

  const filteredProjects = projects.filter((project) => {
    const search = searchTerm.toLowerCase();

    return (
      project.title.toLowerCase().includes(search) ||
      project.clientName.toLowerCase().includes(search) ||
      project.serviceType.toLowerCase().includes(search) ||
      project.status.toLowerCase().includes(search)
    );
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function validateForm() {
    if (!formData.title.trim()) {
      setError("Project title is required.");
      return false;
    }

    if (!formData.clientName.trim()) {
      setError("Client name is required.");
      return false;
    }

    if (formData.price && Number(formData.price) <= 0) {
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
          ? {
              ...formData,
              id: editingId,
              price: formData.price ? Number(formData.price) : "",
            }
          : project
      );

      setProjects(updatedProjects);
      setEditingId(null);
    } else {
      const newProject = {
        ...formData,
        id: Date.now(),
        price: formData.price ? Number(formData.price) : "",
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

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Projects</h3>
          <p>{projects.length}</p>
        </div>

        <div className="stat-card">
          <h3>Active</h3>
          <p>{activeProjects}</p>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completedProjects}</p>
        </div>

        <div className="stat-card">
          <h3>Estimated Revenue</h3>
          <p>€{totalRevenue}</p>
        </div>
      </div>

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

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
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

      <input
        type="text"
        placeholder="Search by project, client, service or status..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="project-grid">
        {filteredProjects.map((project) => (
          <div className="project-card" key={project.id}>
            <h2>{project.title}</h2>

            <p>
              <strong>Client:</strong> {project.clientName}
            </p>

            <p>
              <strong>Service:</strong> {project.serviceType}
            </p>

            <p>
              <strong>Price:</strong>{" "}
              {project.price ? `€${project.price}` : "Not specified"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    project.status === "Completed"
                      ? "#4ade80"
                      : project.status === "In Progress"
                      ? "#facc15"
                      : project.status === "Cancelled"
                      ? "#f87171"
                      : "#60a5fa",
                  fontWeight: "bold",
                }}
              >
                {project.status}
              </span>
            </p>

            <p>
              <strong>Deadline:</strong>{" "}
              {project.deadline || "Not specified"}
            </p>

            <p>
              <strong>Priority:</strong>{" "}
              <span
                style={{
                  color:
                    project.priority === "High"
                      ? "#f87171"
                      : project.priority === "Medium"
                      ? "#facc15"
                      : "#4ade80",
                  fontWeight: "bold",
                }}
              >
                {project.priority}
              </span>
            </p>

            <p>{project.description || "No description available."}</p>

            <div className="button-row">
              <button onClick={() => handleEdit(project)}>Edit</button>
              <button onClick={() => handleDeleteProject(project.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p>No projects found. Try another search term.</p>
      )}
    </main>
  );
}

export default Dashboard;