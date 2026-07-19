
import React, { useState, Component } from 'react';
const double    = x => x * 2;
const add       = (a, b) => a + b;
const greet     = name => `Hello, ${name}! Welcome to React.`;   // template literal
const getSquare = n => ({ value: n * n, label: `${n}² = ${n * n}` }); // returns object
class Animal {
  constructor(name, sound) {
    this.name  = name;
    this.sound = sound;
  }
  speak() { return `${this.name} says: ${this.sound}!`; }
}

class Dog extends Animal {                        
  constructor(name) { super(name, 'Woof'); }
  fetch(item) { return `${this.name} fetches the ${item}!`; }
}
const person = { name: 'Alice', age: 25, city: 'Mumbai', role: 'Developer' };
const { name, age, city, role } = person;         

const colors = ['Red', 'Green', 'Blue', 'Yellow'];
const [primary, secondary, ...rest] = colors;     
const baseConfig = { theme: 'dark', lang: 'en', fontSize: 14 };
const userConfig = { ...baseConfig, fontSize: 16, accent: '#2563eb' }; 

const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];
const combined = [...nums1, ...nums2, 7, 8];     
function ES6Demo() {
  const [input, setInput] = useState('World');
  const [num,   setNum]   = useState(5);
  const handleInputChange = e => setInput(e.target.value);
  const handleNumChange   = e => setNum(Number(e.target.value) || 0);
  const Box = ({ title, children, color = '#f0f9ff', border = '#bae6fd' }) => (
    <div style={{ background: color, border: `1px solid ${border}`, borderRadius: 8, padding: 16, marginBottom: 12 }}>
      <h4 style={{ margin: '0 0 10px', color: '#1e3a8a', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
        {title}
      </h4>
      {children}
    </div>
  );

  const Code = ({ children }) => (
    <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace', fontSize: 13 }}>
      {children}
    </code>
  );

  const dog = new Dog('Rex');

  return (
    <div style={styles.container}>
      <h1 style={{ color: '#1e3a8a' }}>HOL 6: ES6 & JSX Features in React</h1>

      <div style={styles.grid}>

        {/* Arrow Functions */}
        <Box title="Arrow Functions">
          <p><Code>double(7)</Code> → <strong>{double(7)}</strong></p>
          <p><Code>add(3, 4)</Code> → <strong>{add(3, 4)}</strong></p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
            <label style={{ fontSize: 13 }}>n =</label>
            <input type="number" value={num} onChange={handleNumChange}
              style={styles.numInput} />
            <span>→ <strong>{getSquare(num).label}</strong></span>
          </div>
        </Box>

        {/* Template Literals */}
        <Box title="Template Literals">
          <p style={{ marginBottom: 8, fontSize: 13, color: '#6b7280' }}>
            <Code>{`greet(name) = \`Hello, \${name}!\``}</Code>
          </p>
          <input value={input} onChange={handleInputChange}
            placeholder="Enter name" style={styles.textInput} />
          <p style={{ marginTop: 8, background: '#dbeafe', padding: '8px 12px', borderRadius: 6 }}>
            {greet(input || 'Guest')}
          </p>
        </Box>

        {/* Classes & Inheritance */}
        <Box title="Classes & Inheritance">
          <p><Code>dog.speak()</Code></p>
          <p style={styles.result}>"{dog.speak()}"</p>
          <p><Code>dog.fetch('ball')</Code></p>
          <p style={styles.result}>"{dog.fetch('ball')}"</p>
        </Box>

        {/* Destructuring */}
        <Box title="Object & Array Destructuring">
          <p style={{ fontSize: 13, marginBottom: 6 }}>Object:</p>
          <p style={styles.result}>{`name="${name}", age=${age}, city="${city}", role="${role}"`}</p>
          <p style={{ fontSize: 13, margin: '8px 0 6px' }}>Array:</p>
          <p style={styles.result}>{`primary="${primary}", secondary="${secondary}", rest=[${rest.join(', ')}]`}</p>
        </Box>

        {/* Spread Operator */}
        <Box title="Spread Operator">
          <p style={{ fontSize: 13, marginBottom: 4 }}>Object spread (override fontSize):</p>
          <pre style={styles.pre}>{JSON.stringify(userConfig, null, 2)}</pre>
          <p style={{ fontSize: 13, margin: '8px 0 4px' }}>Array spread:</p>
          <p style={styles.result}>[{combined.join(', ')}]</p>
        </Box>

        {/* let / const / var */}
        <Box title="let, const, var">
          <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#1e3a8a', color: '#fff' }}>
                <th style={th}>Keyword</th>
                <th style={th}>Scope</th>
                <th style={th}>Reassign</th>
                <th style={th}>Hoisted</th>
              </tr>
            </thead>
            <tbody>
              {[
                { k: 'var',   s: 'Function', r: '✅', h: '✅ (undefined)' },
                { k: 'let',   s: 'Block',    r: '✅', h: '❌' },
                { k: 'const', s: 'Block',    r: '❌', h: '❌' },
              ].map(row => (
                <tr key={row.k} style={{ background: row.k === 'const' ? '#dcfce7' : '#fff' }}>
                  <td style={{ ...th, fontFamily: 'monospace', fontWeight: 'bold' }}>{row.k}</td>
                  <td style={th}>{row.s}</td>
                  <td style={th}>{row.r}</td>
                  <td style={th}>{row.h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        {/* JSX Rules */}
        <Box title="JSX Rules & Expressions">
          <ul style={{ fontSize: 13, paddingLeft: 18, margin: 0 }}>
            <li>JSX is syntactic sugar for <Code>React.createElement()</Code></li>
            <li>Must return a <strong>single root element</strong> (or Fragment <Code>&lt;&gt;&lt;/&gt;</Code>)</li>
            <li>Use <Code>className</Code> instead of <Code>class</Code></li>
            <li>Use <Code>htmlFor</Code> instead of <Code>for</Code></li>
            <li>All tags must be <strong>self-closing</strong>: <Code>&lt;br /&gt;</Code></li>
            <li>JS expressions in <Code>{'{curly braces}'}</Code></li>
            <li>Inline styles as <strong>objects</strong>: <Code>{`style={{ color: 'red' }}`}</Code></li>
          </ul>
          <div style={{ marginTop: 10, background: '#fff', borderRadius: 6, padding: 10, fontFamily: 'monospace', fontSize: 12, color: '#374151' }}>
            <span style={{ color: '#9333ea' }}>const</span> el = (
            <div style={{ paddingLeft: 16 }}>
              <span style={{ color: '#1d4ed8' }}>&lt;div</span>{' '}
              <span style={{ color: '#10b981' }}>className</span>=<span style={{ color: '#dc2626' }}>"card"</span>{' '}
              <span style={{ color: '#10b981' }}>style</span>={'{{'}color: '#333'{'}}'}&gt;
              <div style={{ paddingLeft: 16 }}>
                <span style={{ color: '#6b7280' }}>{'{/* Expression in JSX */}'}</span><br />
                <span style={{ color: '#1d4ed8' }}>&lt;h1&gt;</span>
                <span style={{ color: '#374151' }}>{'{name}'}</span>
                <span style={{ color: '#1d4ed8' }}>&lt;/h1&gt;</span>
              </div>
              <span style={{ color: '#1d4ed8' }}>&lt;/div&gt;</span>
            </div>
            );
          </div>
        </Box>

        {/* Short Circuit & Ternary in JSX */}
        <Box title="JSX Expressions: Ternary & Short-Circuit">
          <p style={{ fontSize: 13, marginBottom: 8 }}>These are the only way to do conditions in JSX:</p>
          <p><strong>Ternary:</strong> <Code>{`{x > 0 ? 'positive' : 'non-positive'}`}</Code></p>
          <p style={styles.result}>{num > 0 ? `${num} is positive` : `${num} is non-positive`}</p>
          <p><strong>Short-circuit &&:</strong> <Code>{`{isAdmin && <AdminPanel />}`}</Code></p>
          <p style={styles.result}>{num > 10 ? '✅ Number is greater than 10' : null}
            {num <= 10 && <span>⚠️ Number is 10 or less (short-circuit)</span>}
          </p>
        </Box>

      </div>
    </div>
  );
}

const styles = {
  container: { fontFamily: "'Segoe UI', Arial, sans-serif", maxWidth: 1000, margin: '0 auto', padding: 24, color: '#1e293b' },
  grid:      { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: 16 },
  result:    { background: '#f1f5f9', padding: '6px 10px', borderRadius: 6, fontFamily: 'monospace', fontSize: 13, wordBreak: 'break-all' },
  pre:       { background: '#f1f5f9', padding: 8, borderRadius: 6, fontSize: 12, margin: 0, overflowX: 'auto' },
  textInput: { width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' },
  numInput:  { width: 60, padding: '5px 8px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 },
};
const th = { padding: '6px 10px', textAlign: 'left', border: '1px solid #e2e8f0' };

export default ES6Demo;