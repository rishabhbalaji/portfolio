// src/components/ThemeToggle.tsx
import { useState, useEffect } from 'react';

// 1. Get the current theme from localStorage or default to 'dark'
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme as 'light' | 'dark';
    }
    // Fallback to system preference (our "System Light" is 'light')
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  }
  return 'dark'; // Default to "Terminal Mode"
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save preference
  };

  // Apply the theme attribute to the HTML tag whenever 'theme' changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      title="Toggle theme"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.5rem',
        color: 'var(--color-text-primary)',
        transition: 'color 0.2s ease',
        padding: '0.5rem',
      }}
    >
      {/* Icon changes based on theme */}
      {theme === 'dark' ? '☀️' : '🌑'}
    </button>
  );
};

export default ThemeToggle;