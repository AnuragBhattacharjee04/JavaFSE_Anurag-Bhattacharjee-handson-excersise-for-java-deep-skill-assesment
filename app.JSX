
import React, { useState, useRef } from 'react';
function EventLog({ logs, onClear }) {
  return (
    <div style={styles.logContainer}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h4 style={{ margin: 0, color: '#94a3b8' }}>📋 Event Log</h4>
        <button onClick={onClear} style={styles.clearBtn}>Clear</button>
      </div>
      <div style={styles.logBox}>
        {logs.length === 0
          ? <span style={{ color: '#475569' }}>Interact with any element to see events...</span>
          : logs.map((log, i) => (
              <div key={i} style={{ color: log.color || '#94a3b8', marginBottom: 3, fontSize: 13 }}>
                <span style={{ color: '#475569' }}>[{log.time}]</span> {log.msg}
              </div>
            ))
        }
      </div>
    </div>
  );
}
function App() {
  const [logs,      setLogs]      = useState([]);
  const [inputVal,  setInputVal]  = useState('');
  const [mousePos,  setMousePos]  = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);
  const [dragOver,  setDragOver]  = useState(false);
  const [color,     setColor]     = useState('#2563eb');
  const [textArea,  setTextArea]  = useState('');
  const [selectVal, setSelectVal] = useState('');
  const fileInputRef = useRef(null);

  const log = (msg, color = '#94a3b8') => {
    const time = new Date().toLocaleTimeString('en', { hour12: false });
    setLogs(prev => [{ msg, color, time }, ...prev].slice(0, 15));
  };
  const handleClick = (label, e) => {
    log(`onClick fired — "${label}" | button: ${e.button} | ctrl: ${e.ctrlKey}`, '#60a5fa');
  };
  const handleInputChange = (e) => {
    setInputVal(e.target.value);
    log(`onChange — value: "${e.target.value}" | length: ${e.target.value.length}`, '#34d399');
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter')  log(`onKeyDown — Enter pressed! Submitting...`, '#f59e0b');
    if (e.key === 'Escape') { setInputVal(''); log(`onKeyDown — Escape pressed! Input cleared`, '#f59e0b'); }
    if (e.key === 'Tab')    log(`onKeyDown — Tab pressed`, '#f59e0b');
  };
  const handleFocus = () => { setIsFocused(true);  log(`onFocus — input gained focus`, '#a78bfa'); };
  const handleBlur  = () => { setIsFocused(false); log(`onBlur  — input lost focus`,  '#a78bfa'); };
  const handleSubmit = (e) => {
    e.preventDefault();
    log(`onSubmit — form submitted with value: "${inputVal}"`, '#fb923c');
    setInputVal('');
  };
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top) });
  };
  const handleMouseEnter = (label) => log(`onMouseEnter — entered "${label}"`, '#f472b6');
  const handleMouseLeave = (label) => log(`onMouseLeave — left "${label}"`,    '#f472b6');
  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true);  };
  const handleDragLeave = ()  => setDragOver(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    log(`onDrop — dropped ${files.length} file(s): ${files.map(f => f.name).join(', ')}`, '#34d399');
  };

  const handleSelectChange = (e) => {
    setSelectVal(e.target.value);
    log(`onChange (select) — selected: "${e.target.value}"`, '#34d399');
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    log(`onChange (color) — new color: ${e.target.value}`, e.target.value);
  };

  const handleTextAreaChange = (e) => {
    setTextArea(e.target.value);
    log(`onChange (textarea) — chars: ${e.target.value.length}`, '#34d399');
  };

  return (
    <div style={styles.container}>
      <h1 style={{ color: '#1e3a8a' }}>HOL 5: React Events</h1>

      <div style={styles.layout}>
        <div style={styles.left}>

          {/* onClick */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>🖱️ onClick / onDoubleClick</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Primary', 'Success', 'Warning', 'Danger'].map((label, i) => {
                const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444'];
                return (
                  <button key={label}
                    onClick={(e)       => handleClick(label, e)}
                    onDoubleClick={() => log(`onDoubleClick — "${label}" double-clicked!`, '#f472b6')}
                    onMouseEnter={() => handleMouseEnter(label)}
                    onMouseLeave={() => handleMouseLeave(label)}
                    style={{ ...styles.btn, background: colors[i] }}>
                    {label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* onChange + onKeyDown + onFocus + onBlur + onSubmit */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>⌨️ onChange / onKeyDown / onFocus / onBlur / onSubmit</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
              <input
                value={inputVal}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Type here... (Enter=submit, Esc=clear)"
                style={{ ...styles.input, borderColor: isFocused ? '#2563eb' : '#d1d5db', flex: 1 }}
              />
              <button type="submit" style={{ ...styles.btn, background: '#2563eb' }}>Submit</button>
            </form>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: '#6b7280' }}>
              Characters: <strong>{inputVal.length}</strong> | Focused: <strong>{isFocused ? 'Yes' : 'No'}</strong>
            </p>
          </section>

          {/* onMouseMove */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>📍 onMouseMove</h3>
            <div
              onMouseMove={handleMouseMove}
              style={{ background: '#f1f5f9', borderRadius: 8, padding: 20, textAlign: 'center', cursor: 'crosshair' }}>
              <p style={{ margin: 0, fontFamily: 'monospace' }}>
                Mouse Position — X: <strong>{mousePos.x}</strong> | Y: <strong>{mousePos.y}</strong>
              </p>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#94a3b8' }}>Move your mouse here</p>
            </div>
          </section>

          {/* onChange variants */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>📝 onChange Variants</h3>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {/* Select */}
              <div style={{ flex: 1, minWidth: 160 }}>
                <label style={styles.label}>Select (dropdown)</label>
                <select value={selectVal} onChange={handleSelectChange} style={styles.input}>
                  <option value="">-- Choose --</option>
                  {['Java', 'React', 'Spring Boot', 'Python', 'DevOps'].map(o =>
                    <option key={o} value={o}>{o}</option>
                  )}
                </select>
              </div>
              {/* Color */}
              <div style={{ flex: 1, minWidth: 160 }}>
                <label style={styles.label}>Color Picker</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="color" value={color} onChange={handleColorChange}
                    style={{ width: 48, height: 36, padding: 2, borderRadius: 4, border: '1px solid #d1d5db', cursor: 'pointer' }} />
                  <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color }}>{color}</span>
                </div>
              </div>
            </div>
            {/* Textarea */}
            <div style={{ marginTop: 12 }}>
              <label style={styles.label}>Textarea</label>
              <textarea
                value={textArea}
                onChange={handleTextAreaChange}
                rows={3}
                placeholder="Type a multi-line message..."
                style={{ ...styles.input, width: '100%', resize: 'vertical', boxSizing: 'border-box' }}
              />
              <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6b7280' }}>
                {textArea.length} characters | {textArea.split('\n').length} line(s)
              </p>
            </div>
          </section>

          {/* Drag and Drop */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>📂 onDragOver / onDrop</h3>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              style={{
                ...styles.dropZone,
                background: dragOver ? '#dbeafe' : '#f8fafc',
                borderColor: dragOver ? '#2563eb' : '#cbd5e1',
              }}>
              <p style={{ fontSize: 36, margin: 0 }}>📁</p>
              <p style={{ margin: '4px 0', fontWeight: 500 }}>
                {dragOver ? 'Release to drop files!' : 'Drag & drop files here or click to browse'}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>Supported: any file type</p>
              <input ref={fileInputRef} type="file" multiple hidden
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  log(`onChange (file) — selected ${files.length} file(s): ${files.map(f => f.name).join(', ')}`, '#34d399');
                }} />
            </div>
          </section>

        </div>

        {}
        <div style={styles.right}>
          <EventLog logs={logs} onClear={() => setLogs([])} />
        </div>
      </div>
    </div>
  );
}
const styles = {
  container:    { fontFamily: "'Segoe UI', Arial, sans-serif", maxWidth: 1100, margin: '0 auto', padding: 24, color: '#1e293b' },
  layout:       { display: 'flex', gap: 20, alignItems: 'flex-start' },
  left:         { flex: 1 },
  right:        { width: 340, position: 'sticky', top: 20 },
  section:      { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 16, marginBottom: 14 },
  sectionTitle: { margin: '0 0 12px', color: '#1e3a8a', fontSize: 15 },
  btn:          { padding: '8px 18px', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 },
  input:        { padding: '8px 12px', border: '1.5px solid #d1d5db', borderRadius: 6, fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box' },
  label:        { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 },
  dropZone:     { border: '2px dashed', borderRadius: 10, padding: 24, textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' },
  logContainer: { background: '#0f172a', borderRadius: 10, padding: 14 },
  logBox:       { height: 500, overflowY: 'auto', fontFamily: 'monospace' },
  clearBtn:     { background: '#334155', color: '#94a3b8', border: 'none', borderRadius: 4, padding: '3px 10px', cursor: 'pointer', fontSize: 12 },
};

export default App;