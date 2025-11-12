// src/components/Navbar.tsx
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

// --- STYLES ---

// The main bar: full-width, sticky, with blur
const navWrapperStyle: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 100,
  width: '100%',
  fontFamily: 'var(--font-heading)',
  borderBottom: '1px solid var(--color-border)',

  // The "Modern" blur effect
  backgroundColor: 'color-mix(in srgb, var(--color-surface) 80%, transparent)',
  backdropFilter: 'blur(10px)',
};

// The inner container: centers content, matches other sections
const navContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px', // Matches AboutMe section
  margin: '0 auto',
  padding: '1rem 2rem',
};

const brandLinkStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  textDecoration: 'none',
};

const navLinksListStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1.5rem',
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const ctaContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const ctaButtonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  background: 'var(--color-accent-primary)',
  color: 'var(--color-background)',
  border: 'none',
  borderRadius: '4px', // Our "precise" corner
  cursor: 'pointer',
  fontFamily: 'var(--font-heading)',
  fontWeight: 'bold',
};

// --- COMPONENT ---

// This function checks if the NavLink is active and returns our class
const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'active-nav-link' : '';

const Navbar = () => {
  return (
    <nav style={navWrapperStyle}>
      <div style={navContainerStyle}>
        {/* Left Side: Logo/Brand */}
        <NavLink to="/" style={brandLinkStyle}>
          RBK_DEV
        </NavLink>

        {/* Middle: Nav Links */}
        <ul style={navLinksListStyle}>
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
        <div style={ctaContainerStyle}>
          <ThemeToggle />
          <motion.button
            style={ctaButtonStyle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;