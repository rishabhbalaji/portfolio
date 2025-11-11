// src/App.tsx
import {useState, useEffect} from 'react'
import client from './client' // Import our new client

// Define a type for our project data
interface Project {
  _id: string;
  title: string;
}

function App() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    // This is a GROQ query to fetch all documents of type 'project'
    const query = '*[_type == "project"]{_id, title}'

    client.fetch(query)
      .then((data: Project[]) => {
        setProjects(data)
      })
      .catch(console.error)
  }, []) // The empty array means this runs once on page load

  return (
    <div style={{padding: '2rem'}}>
      <h1>My Portfolio</h1>
      <h2>Projects from Sanity:</h2>

      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>{project.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading projects...</p>
      )}
    </div>
  )
}

export default App