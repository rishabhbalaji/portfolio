// src/pages/ProjectsPage.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import client from '../client'; // Our Sanity client
import ProjectCard from '../components/ProjectCard'; // Our new component
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Define the Project type again (or we could move this to a types.ts file)
interface Project {
  _id: string;
  title: string;
  thumbnail: SanityImageSource;
  shortDescription: string;
  tags: string[];
  githubUrl: string;
  youtubeUrl?: string;
  order: number; // For sorting
}

// This is the GROQ query to fetch our projects
// We sort by the 'order' field, then by title
const projectQuery = `*[_type == "project"] | order(order asc, title asc) {
  _id,
  title,
  thumbnail,
  shortDescription,
  tags,
  githubUrl,
  youtubeUrl,
  order
}`;

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(projectQuery)
      .then((data: Project[]) => {
        setProjects(data);
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
        <h1 style={headingStyle}>Projects</h1>
        <p style={subheadingStyle}>
          A collection of my work, from hackathons to personal security tools.
        </p>

        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <div style={gridStyle}>
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

// --- Styles ---
const sectionStyle: React.CSSProperties = {
  padding: '4rem 2rem',
  minHeight: '80vh',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
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

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '2rem',
};

export default ProjectsPage;