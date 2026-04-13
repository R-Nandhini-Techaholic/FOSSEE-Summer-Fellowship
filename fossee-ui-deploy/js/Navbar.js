const { useState } = React;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const ctx = window.DJANGO_CONTEXT || {};
  const { isAuthenticated, isInstructor, userFullName, urls } = ctx;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenus = () => { setIsOpen(false); setDropdownOpen(false); };
  const path = window.location.pathname;

  const isActive = (linkPath) => path === linkPath ? 'active' : '';

  return (
    <nav className="react-navbar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <window.ReactComponents.InstitutionalLogos variant="navbar" />
        <a href={urls.home || "/"} className="navbar-brand">FOSSEE Workshops</a>
      </div>

      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation">
        ☰
      </button>

      <div className={`navbar-menu ${isOpen ? 'open' : ''}`} onClick={closeMenus}>
        <a href={urls.home || "/"} className={`navbar-link ${isActive(urls.home || "/")}`}>Home</a>
        <a href={urls.statsPublic || "/"} className={`navbar-link ${isActive(urls.statsPublic || "/")}`}>Workshop Statistics</a>

        {isAuthenticated && (
          <>
            {isInstructor && (
              <a href={urls.statsTeam || "/"} className={`navbar-link ${isActive(urls.statsTeam || "/")}`}>Team Statistics</a>
            )}
            <a href={urls.statusInstructor || "/"} className={`navbar-link ${isActive(urls.statusInstructor || "/")}`}>Workshop Status</a>
            {!isInstructor && (
              <a href={urls.propose || "/"} className={`navbar-link ${isActive(urls.propose || "/")}`}>Propose Workshop</a>
            )}
            <a href={urls.workshopTypes || "/"} className={`navbar-link ${isActive(urls.workshopTypes || "/")}`}>Workshop Types</a>

            <div className="dropdown-container">
              <span
                className="navbar-link"
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
              >
                👤 {userFullName} {dropdownOpen ? '▴' : '▾'}
              </span>

              {(dropdownOpen || isOpen) && (
                <div className="dropdown-menu-react">
                  <a href={urls.profile || "/"} className="dropdown-item-react">Profile</a>
                  <a href={urls.changePassword || "/"} className="dropdown-item-react">Change Password</a>
                  <a href={urls.logout || "/"} className="dropdown-item-react">Logout</a>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

window.ReactComponents = window.ReactComponents || {};
window.ReactComponents.Navbar = Navbar;
