import { useState } from "react";
import { AppLink } from "./AppLink.jsx";
import { assets } from "../data/assets.js";
import { site, navItems } from "../data/site.js";

export function Header({ path, navigate, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = (target) => {
    if (target === "/") return path === "/";
    return path.startsWith(target);
  };

  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="top-strip-inner">
          <span>{site.address}</span>
          <span>{site.phone}</span>
          <span>{site.hours}</span>
          <span>Ministry Approved | TITI Certified | ECAN Member</span>
        </div>
      </div>

      <div className="nav-shell">
        <button className="brand" type="button" onClick={() => navigate("/")}>
          <img src={assets.logo} alt="EduMark logo" />
          <span>
            <strong>EduMark</strong>
            <small>Education Consultancy</small>
          </span>
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <div className="nav-group" key={item.path}>
              <AppLink
                to={item.path}
                navigate={navigate}
                className={active(item.path) ? "nav-item nav-item-active" : "nav-item"}
              >
                {item.label}
              </AppLink>
              {item.children ? (
                <div className="nav-menu">
                  {item.children.map((child) => (
                    <AppLink key={child.path} to={child.path} navigate={navigate} className="nav-subitem">
                      {child.label}
                    </AppLink>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="search-button" type="button" onClick={onSearch}>
            Search
          </button>
          <AppLink to="/book-free-consultation" navigate={navigate} className="primary-button compact">
            Book Free Consultation
          </AppLink>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            Menu
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mobile-panel">
          {navItems.map((item) => (
            <div className="mobile-group" key={item.path}>
              <AppLink
                to={item.path}
                navigate={navigate}
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </AppLink>
              {item.children
                ? item.children.map((child) => (
                  <AppLink
                    key={child.path}
                    to={child.path}
                    navigate={navigate}
                    className="mobile-link mobile-sublink"
                    onClick={() => setMenuOpen(false)}
                  >
                    {child.label}
                  </AppLink>
                ))
                : null}
            </div>
          ))}
          <AppLink
            to="/book-free-consultation"
            navigate={navigate}
            className="primary-button full"
            onClick={() => setMenuOpen(false)}
          >
            Book Free Consultation
          </AppLink>
        </div>
      ) : null}
    </header>
  );
}
