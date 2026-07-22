import { useEffect, useState } from 'react';
import { getProjects, getServices, getReferences } from '../api/api';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [references, setReferences] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects).catch(() => {});
    getServices().then(setServices).catch(() => {});
    getReferences().then(setReferences).catch(() => {});
  }, []);

  return (
    <div className="page">
      <section className="hero">
        <h1>My Portfolio</h1>
        <p>Welcome to my full-stack portfolio application.</p>
      </section>

      <section className="section">
        <h2>Projects</h2>
        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          <div className="card-grid">
            {projects.map((p) => (
              <div key={p.id} className="card">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                {p.technologies && <p><strong>Tech:</strong> {p.technologies}</p>}
                {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="btn btn-secondary">View Project</a>}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <h2>Services</h2>
        {services.length === 0 ? (
          <p>No services yet.</p>
        ) : (
          <div className="card-grid">
            {services.map((s) => (
              <div key={s.id} className="card">
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                {s.price && <p><strong>Price:</strong> {s.price}</p>}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <h2>References</h2>
        {references.length === 0 ? (
          <p>No references yet.</p>
        ) : (
          <div className="card-grid">
            {references.map((r) => (
              <div key={r.id} className="card">
                <h3>{r.name}</h3>
                {r.position && r.company && <p>{r.position} at {r.company}</p>}
                {r.testimonial && <blockquote>"{r.testimonial}"</blockquote>}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
