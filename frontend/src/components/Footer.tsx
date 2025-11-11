// src/components/Footer.tsx
const Footer = () => {
  return (
    <footer style={{ 
      padding: '1rem 2rem', 
      background: 'var(--color-surface)', 
      borderTop: '1px solid var(--color-border)',
      textAlign: 'center',
      marginTop: 'auto' // Pushes footer to bottom
    }}>
      <p>&copy; 2025 [Your Name] - Built with React & Sanity</p>
    </footer>
  )
}

export default Footer