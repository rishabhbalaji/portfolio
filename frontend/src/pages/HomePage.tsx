// src/pages/HomePage.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AboutMe from '../components/AboutMe';
// --- Icon Filenames ---
// The component will load these from the `public/icons/` folder.
// I'm using your 10 variants from the Figma JSON.
const ICON_FILES = [
  'Vector.svg',
  'Vector-1.svg',
  'Vector-2.svg',
  'Vector-3.svg',
  'Vector-4.svg',
  'Vector-5.svg', // (Assuming filenames)
  'Vector-6.svg',
  'Vector-7.svg',
  'Vector-8.svg',
  'Vector-9.svg',
];

// --- The New Animation Component ---
const HeroAnimation = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Cycle to the next icon every 1.5 seconds
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % ICON_FILES.length);
    }, 3500); // 3.5-second interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: '200px',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        filter: 'drop-shadow(0 0 10px var(--color-accent-primary))',
        marginBottom: '2rem',
        position: 'relative', // Container for AnimatePresence
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          // By changing the 'key', Framer Motion knows to run the
          // exit and enter animations.
          key={index}
          src={`/icons/${ICON_FILES[index]}`}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute', // Allows stacking for fade
            color: 'var(--color-accent-primary)', // (Will color SVGs if they use 'currentColor')
          }}
          // --- The Animation ---
          initial={{ opacity: 0, scale: 0.25 }} // Start: Invisible and small
          animate={{ opacity: 1, scale: 1 }} // Enter: Fade in and grow
          exit={{ opacity: 0, scale: 0.25 }} // Exit: Fade out and shrink
          transition={{
            // Use the "ease-in-and-out-back" springy feel
            type: 'spring',
            stiffness: 150,
            damping: 15,
            duration: 0.75, // Matches your 750ms Figma prototype
          }}
        />
      </AnimatePresence>
    </div>
  );
};

// --- The Hero Component ---
const Hero = () => {
  return (
    <section
      style={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem 1rem',
      }}
    >
      {/* 2. Main Headline (The NEW Animation) */}
      <HeroAnimation />

      {/* 3. Sub-Headline */}
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          color: 'var(--color-text-primary)',
          marginBottom: '1rem',
        }}
      >
        RBK_DEV
      </h1>
      <p
        style={{
          fontSize: '1.5rem',
          maxWidth: '600px',
          color: 'var(--color-text-secondary)',
          fontFamily: 'var(--font-body)',
        }}
      >
        I bridge the gap between building secure applications and breaking them to
        find vulnerabilities.
      </p>

      {/* 4. CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          padding: '0.75rem 2rem',
          marginTop: '3rem',
          background: 'var(--color-accent-primary)',
          color: 'var(--neutral-900)',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontFamily: 'var(--font-heading)',
          fontWeight: 'bold',
        }}
        onClick={() => {
          /* Navigate to projects section */
        }}
      >
        View Projects
      </motion.button>
    </section>
  );
};

// --- The Page Wrapper ---
const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutMe />
    </>
  );
};

export default HomePage;