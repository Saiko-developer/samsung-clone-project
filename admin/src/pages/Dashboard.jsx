import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, collections } from "../api/client";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStats() {
      try {
        const results = {};
        await Promise.all(
          collections.map(async (col) => {
            try {
              const items = await api.getAll(col.name);
              results[col.name] = items.length;
            } catch (err) {
              results[col.name] = 0;
            }
          })
        );
        setStats(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  const totalItems = Object.values(stats).reduce((sum, n) => sum + n, 0);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Manage all project data across {collections.length} collections ({totalItems} total items)</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{collections.length}</span>
          <span className="stat-label">Collections</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalItems}</span>
          <span className="stat-label">Total Items</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{Object.keys(stats).filter((k) => stats[k] > 0).length}</span>
          <span className="stat-label">Populated Collections</span>
        </div>
      </div>

      <h2>Collections</h2>
      <div className="collection-grid">
        {collections.map((col) => (
          <Link to={`/collection/${col.name}`} key={col.name} className="collection-card">
            <div className="collection-icon">{col.icon}</div>
            <div className="collection-info">
              <span className="collection-name">{col.label}</span>
              <span className="collection-count">
                {stats[col.name] ?? 0} items
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;