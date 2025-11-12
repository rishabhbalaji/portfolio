// src/components/ProjectCard.tsx
import { motion } from 'framer-motion';
import client from '../client'; // Import our Sanity client
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
// 1. Set up the image URL builder
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// 2. Define the TypeScript type for our Project (matches Sanity schema)
interface Project {
  _id: string;
  title: string;
  thumbnail: SanityImageSource; // Sanity image asset
  shortDescription: string;
  tags: string[];
  githubUrl: string;
  youtubeUrl?: string;
}

// 3. Define the component props
interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      style={cardStyle}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Project Thumbnail */}
      <img
        src={urlFor(project.thumbnail).width(600).url()} // Get a 600px wide version
        alt={`${project.title} thumbnail`}
        style={imageStyle}
      />

      <div style={contentStyle}>
        {/* Project Title */}
        <h3 style={titleStyle}>{project.title}</h3>

        {/* Project Description */}
        <p style={descriptionStyle}>{project.shortDescription}</p>

        {/* Project Tags */}
        <div style={tagsContainerStyle}>
          {project.tags.map((tag) => (
            <span key={tag} style={tagStyle}>
              {tag}
            </span>
          ))}
        </div>

        {/* Project Links */}
        <div style={linksContainerStyle}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            GitHub
          </a>
          {project.youtubeUrl && (
            <a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              Demo Video
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- Styles ---
const cardStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  borderRadius: '8px', // Our 8px corner
  overflow: 'hidden',
  border: '1px solid var(--color-border)',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderBottom: '1px solid var(--color-border)',
};

const contentStyle: React.CSSProperties = {
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1, // Makes the card content fill the space
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.5rem',
  color: 'var(--color-text-primary)',
  marginBottom: '0.75rem',
};

const descriptionStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  color: 'var(--color-text-secondary)',
  fontSize: '1rem',
  lineHeight: 1.5,
  marginBottom: '1rem',
  flexGrow: 1, // Pushes tags/links to the bottom
};

const tagsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginBottom: '1.5rem',
};

const tagStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  backgroundColor: 'var(--color-background)',
  border: '1px solid var(--color-border)',
  padding: '0.25rem 0.75rem',
  borderRadius: '4px',
  color: 'var(--color-accent-secondary)', // Use Cyber Blue
  fontSize: '0.75rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
};

const linksContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
};

const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  color: 'var(--color-accent-primary)',
  textDecoration: 'none',
  fontWeight: 'bold',
};

export default ProjectCard;