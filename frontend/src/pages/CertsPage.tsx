// src/pages/CertsPage.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import client from '../client';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from '@sanity/image-url';

// --- Helper for Sanity Images ---
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// --- TypeScript Type for our Certification ---
interface Certification {
  _id: string;
  title: string;
  issuer: string;
  dateIssued?: string;
  credentialUrl?: string;
  icon?: SanityImageSource;
}

// --- GROQ Query to fetch certs, sorted by date ---
const certQuery = `*[_type == "certification"] | order(dateIssued desc) {
  _id,
  title,
  issuer,
  dateIssued,
  credentialUrl,
  icon
}`;

// --- The Main Page Component ---
const CertsPage = () => {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(certQuery)
      .then((data: Certification[]) => {
        setCerts(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <motion.section
      style={sectionStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div style={containerStyle}>
        <h1 style={headingStyle}>Certifications & Learning</h1>
        <p style={subheadingStyle}>
          A timeline of my formal certifications and self-study achievements.
        </p>

        {loading ? (
          <p>Loading certifications...</p>
        ) : (
          <div style={timelineStyle}>
            {certs.map((cert, index) => (
              <TimelineItem key={cert._id} cert={cert} index={index} />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

// --- TimelineItem: A component to render one cert ---
const TimelineItem = ({ cert, index }: { cert: Certification; index: number }) => {
  // Simple date formatting (e.g., 2023-10 -> OCT 2023)
  const formattedDate = cert.dateIssued
    ? new Date(cert.dateIssued).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        timeZone: 'UTC', // Ensure consistent parsing
      })
    : 'Ongoing';

  // Stagger the animation
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1, // Each item fades in 0.1s after the last
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      style={itemStyle}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* The dot on the timeline */}
      <div style={dotStyle} />

      {/* The card content */}
      <div style={contentStyle}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>{cert.title}</h3>
          <span style={dateStyle}>{formattedDate}</span>
        </div>
        <p style={issuerStyle}>{cert.issuer}</p>
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            View Credential
          </a>
        )}
      </div>
    </motion.div>
  );
};

// --- Styles ---
const sectionStyle: React.CSSProperties = {
  padding: '4rem 2rem',
  minHeight: '80vh',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '900px', // A bit narrower for a timeline
  margin: '0 auto',
};

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: '3rem',
  color: 'var(--color-text-primary)',
  marginBottom: '1rem',
  textAlign: 'center',
};

const subheadingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '1.25rem',
  color: 'var(--color-text-secondary)',
  marginBottom: '4rem',
  textAlign: 'center',
};

const timelineStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  // The vertical timeline bar
  '--line-color': 'var(--color-border)',
};

// Using ::before pseudo-element for the timeline bar
// We'll add this to index.css as it's cleaner
const itemStyle: React.CSSProperties = {
  position: 'relative',
  paddingLeft: '3rem', // Space for the dot and line
  paddingBottom: '1rem',
};

const dotStyle: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  top: '0.25rem',
  width: '18px',
  height: '18px',
  backgroundColor: 'var(--color-accent-primary)',
  borderRadius: '50%',
  border: '3px solid var(--color-surface)',
  zIndex: 1,
};

const contentStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: '8px',
  padding: '1.5rem',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginBottom: '0.5rem',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.25rem',
  color: 'var(--color-text-primary)',
};

const dateStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: '0.875rem',
  color: 'var(--color-text-secondary)',
  flexShrink: 0, // Prevents date from wrapping
};

const issuerStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  color: 'var(--color-text-secondary)',
  marginBottom: '1rem',
};

const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  color: 'var(--color-accent-primary)',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '0.875rem',
};

export default CertsPage;