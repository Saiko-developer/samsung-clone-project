import { Outlet, NavLink } from "react-router-dom";
import { collections } from "../api/client";

function Layout() {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Samsung Admin</h1>
          <p>Dashboard</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            📊 Overview
          </NavLink>
          <div className="nav-section">Collections</div>
          {collections.map((col) => (
            <NavLink
              key={col.name}
              to={`/collection/${col.name}`}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {col.icon} {col.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;