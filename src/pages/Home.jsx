import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-hero">
      <h1>
        Cristi<span className="brand-green">ON</span>
      </h1>

      <p>Premium Webdesign & Client Manager</p>

      <Link to="/register">
        <button style={{ marginTop: "20px" }}>
          Get Started
        </button>
      </Link>
    </main>
  );
}

export default Home;