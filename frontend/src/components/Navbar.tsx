// src/components/Navbar.tsx
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const navStyles: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 100, // High z-index to stay on top
  width: '100%',
  padding: '1rem 2rem',
  backgroundColor: 'var(--color-surface)',
  borderBottom: '1px solid var(--color-border)',
  fontFamily: 'var(--font-heading)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

// Style for active nav link (now uses a CSS class for cleaner TS)
const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'active-nav-link' : '';

const Navbar = () => {
  return (
    <nav style={navStyles}>
      {/* Left Side: Logo/Brand */}
      <NavLink to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
        RBK_DEV
      </NavLink>

      {/* Middle: Nav Links */}
      <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none' }}>
        <li>
          <NavLink to="/projects" className={getLinkClass}>
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/certifications" className={getLinkClass}>
            Certs
          </NavLink>
        </li>
      </ul>

      {/* Right Side: CTAs & Theme Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <ThemeToggle />
        <button
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--color-accent-primary)',
            color: 'var(--color-background)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'var(--font-heading)',
          }}
        >
          Get In Touch
        </button>
      </div>
    </nav>
  );
};

export default Navbar;