
import React from 'react';

function App() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>⚛️ HOL 1: Introduction to React</h1>
        <p style={styles.subtitle}>DN 5.0 Deep Skilling — Module 9</p>
      </header>

      <section style={styles.card}>
        <h2> What is a Single Page Application (SPA)?</h2>
        <p>
          A <strong>Single Page Application</strong> loads one HTML page and
          dynamically rewrites content as the user interacts — without full
          page reloads. This results in faster navigation and a smoother UX.
        </p>
        <div style={styles.compare}>
          <div style={styles.compareBox}>
            <h4>Traditional MPA</h4>
            <ul>
              <li>Full page reload per route</li>
              <li>Server renders HTML each time</li>
              <li>Slower user experience</li>
            </ul>
          </div>
          <div style={{ ...styles.compareBox, background: '#dcfce7' }}>
            <h4>🟢 SPA (React)</h4>
            <ul>
              <li>Single HTML file loaded once</li>
              <li>JavaScript updates the DOM</li>
              <li>Fast, app-like experience</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={styles.card}>
        <h2>What is React?</h2>
        <ul>
          <li>Open-source JavaScript <strong>UI library</strong> by Meta (Facebook)</li>
          <li>Component-based architecture — reusable UI pieces</li>
          <li>Declarative — describe <em>what</em> the UI looks like, not <em>how</em> to update it</li>
          <li>Uses JSX — HTML-like syntax inside JavaScript</li>
          <li>Unidirectional data flow (parent → child via props)</li>
        </ul>
      </section>

      <section style={styles.card}>
        <h2>Virtual DOM</h2>
        <p>React keeps a <strong>virtual copy</strong> of the real DOM in memory.</p>
        <ol>
          <li>State changes → React re-renders Virtual DOM</li>
          <li>React <strong>diffs</strong> the new vs old Virtual DOM</li>
          <li>Only changed elements are updated in the real DOM</li>
          <li>Result: minimal DOM manipulation = high performance</li>
        </ol>
      </section>

      <section style={styles.card}>
        <h2>create-react-app</h2>
        <pre style={styles.code}>{`# Create a new React application
npx create-react-app my-app

# Navigate into the project
cd my-app

# Start development server (http://localhost:3000)
npm start

# Build for production
npm run build`}</pre>
      </section>

      <footer style={styles.footer}>
        DN 5.0 Deep Skilling | React HOL 1 | Cognizant
      </footer>
    </div>
  );
}

const styles = {
  container:  { fontFamily: "'Segoe UI', Arial, sans-serif", maxWidth: 850, margin: '0 auto', padding: 24, color: '#1e293b' },
  header:     { background: 'linear-gradient(135deg,#1e3a8a,#2563eb)', color: '#fff', padding: '28px 24px', borderRadius: 12, marginBottom: 24 },
  title:      { margin: 0, fontSize: 28 },
  subtitle:   { margin: '8px 0 0', opacity: 0.85 },
  card:       { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 24, marginBottom: 18 },
  compare:    { display: 'flex', gap: 16, marginTop: 12 },
  compareBox: { flex: 1, background: '#fee2e2', borderRadius: 8, padding: 16 },
  code:       { background: '#1e293b', color: '#94a3b8', padding: 16, borderRadius: 8, fontSize: 13, overflowX: 'auto' },
  footer:     { textAlign: 'center', color: '#94a3b8', fontSize: 13, marginTop: 32 },
};

export default App;