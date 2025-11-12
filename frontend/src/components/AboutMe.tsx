// src/components/AboutMe.tsx
import { motion } from 'framer-motion';

// --- Define your toolkit here ---
const skills = [
  'Python',
  'Linux',
  'Nmap',
  'Wireshark',
  'React',
  'Docker',
  'Metasploit',
  'Terraform', // (Add/remove skills as needed)
];
// --------------------------------

const AboutMe = () => {
  return (
    <motion.section
      style={sectionStyle}
      initial={{ opacity: 0, y: 50 }} // Animate in on scroll
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div style={containerStyle}>
        {/* Left Column: The Copy */}
        <div style={textContainerStyle}>
          <h2 style={headingStyle}>About Me</h2>
          <p style={paragraphStyle}>
            Hi, I'm [Your Name]. I'm a hands-on cybersecurity professional who
            thrives on the challenge of "what-if." I bridge the gap between
            building secure applications and breaking them to find
            vulnerabilities.
          </p>
          <p style={paragraphStyle}>
            My passion is in offensive security, but I believe the best defense
            starts with secure-by-design development. When I'm not running
            a scan, you can find me competing in CTFs on TryHackMe or building
            new tools.
          </p>
        </div>

        {/* Right Column: The Toolkit */}
        <div style={toolkitContainerStyle}>
          <h3 style={headingStyle}>My Current Toolkit</h3>
          <ul style={listStyle}>
            {skills.map((skill) => (
              <li key={skill} style={listItemStyle}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

// --- Styles ---
// (We keep styles here for component modularity)

const sectionStyle: React.CSSProperties = {
  padding: '6rem 2rem', // Lots of space
  backgroundColor: 'var(--color-surface)', // Use the "card" color
  borderTop: '1px solid var(--color-border)',
  borderBottom: '1px solid var(--color-border)',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '4rem',
  flexWrap: 'wrap', // Stack on small screens
};

const textContainerStyle: React.CSSProperties = {
  flex: 2, // Takes 2/3 of the space
  minWidth: '300px',
};

const toolkitContainerStyle: React.CSSProperties = {
  flex: 1, // Takes 1/3 of the space
  minWidth: '300px',
};

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  color: 'var(--color-text-primary)',
  fontSize: '2rem',
  marginBottom: '1.5rem',
};

const paragraphStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  color: 'var(--color-text-secondary)',
  fontSize: '1.125rem',
  lineHeight: 1.6,
  marginBottom: '1rem',
};

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
};

const listItemStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  backgroundColor: 'var(--color-background)', // Use main bg
  border: '1px solid var(--color-border)',
  padding: '0.5rem 1rem',
  borderRadius: '4px', // Use our 4px corner
  color: 'var(--color-accent-primary)', // Cyber Green
  fontSize: '0.875rem',
  fontWeight: 'bold',
};

export default AboutMe;