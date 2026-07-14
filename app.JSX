

import React, { Component } from 'react';
function WelcomeBanner({ title, subtitle, color = '#2563eb' }) {
  return (
    <div style={{ background: color, color: '#fff', padding: '20px 24px', borderRadius: 10, marginBottom: 20 }}>
      <h1 style={{ margin: 0 }}>{title}</h1>
      <p style={{ margin: '6px 0 0', opacity: 0.9 }}>{subtitle}</p>
    </div>
  );
}
function ProfileCard({ name, role, department, joinYear }) {
  const experience = new Date().getFullYear() - joinYear;
  return (
    <div style={styles.card}>
      <div style={styles.avatar}>{name.charAt(0)}</div>
      <div>
        <h3 style={{ margin: '0 0 4px' }}>{name}</h3>
        <p style={styles.meta}>{role} — {department}</p>
        <p style={styles.meta}>Experience: {experience} years</p>
      </div>
    </div>
  );
}
class DigitalClock extends Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date().toLocaleTimeString() };
  }

  componentDidMount() {
    // Update clock every second
    this.timer = setInterval(
      () => this.setState({ time: new Date().toLocaleTimeString() }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);   
  }

  render() {
    return (
      <div style={styles.clockBox}>
        <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>Class Component — Live Clock</p>
        <h2 style={{ margin: '8px 0 0', fontFamily: 'monospace', fontSize: 32, color: '#1e3a8a' }}>
          {this.state.time}
        </h2>
      </div>
    );
  }
}
class Counter extends Component {
  state = { count: 0, step: 1 };

  increment = () => this.setState(p => ({ count: p.count + p.step }));
  decrement = () => this.setState(p => ({ count: p.count - p.step }));
  reset     = () => this.setState({ count: 0 });

  render() {
    const { count, step } = this.state;
    return (
      <div style={styles.counterBox}>
        <h3>Class Component — Counter</h3>
        <p style={{ fontSize: 48, fontWeight: 'bold', color: count < 0 ? '#ef4444' : '#1e3a8a', margin: 0 }}>
          {count}
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '12px 0' }}>
          <button onClick={this.decrement} style={btn('#ef4444')}>−</button>
          <button onClick={this.reset}     style={btn('#6b7280')}>Reset</button>
          <button onClick={this.increment} style={btn('#10b981')}>+</button>
        </div>
        <label style={{ fontSize: 13, color: '#6b7280' }}>
          Step size:&nbsp;
          <input type="number" min="1" value={step}
            onChange={e => this.setState({ step: Number(e.target.value) })}
            style={{ width: 50, padding: '4px 6px', borderRadius: 4, border: '1px solid #d1d5db' }} />
        </label>
      </div>
    );
  }
}
function App() {
  const employees = [
    { name: 'Alice Johnson', role: 'Senior Developer',  department: 'Engineering', joinYear: 2019 },
    { name: 'Bob Smith',     role: 'Product Manager',   department: 'Product',     joinYear: 2021 },
    { name: 'Carol White',   role: 'UX Designer',       department: 'Design',      joinYear: 2020 },
  ];

  return (
    <div style={styles.container}>
      {}
      <WelcomeBanner
        title="HOL 2: React Components"
        subtitle="Functional and Class components demonstration"
        color="#1e3a8a"
      />

      {}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
        <div style={{ flex: 1 }}><DigitalClock /></div>
        <div style={{ flex: 1 }}><Counter /></div>
      </div>

      {}
      <h2>Employee Cards (Functional Components)</h2>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {employees.map((emp, i) => <ProfileCard key={i} {...emp} />)}
      </div>
    </div>
  );
}

const styles = {
  container:  { fontFamily: 'Arial', maxWidth: 900, margin: '0 auto', padding: 24 },
  card:       { display: 'flex', alignItems: 'center', gap: 16, background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 10, padding: 16, flex: 1 },
  avatar:     { width: 50, height: 50, borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 'bold', flexShrink: 0 },
  meta:       { margin: '2px 0', fontSize: 13, color: '#64748b' },
  clockBox:   { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20, textAlign: 'center' },
  counterBox: { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20, textAlign: 'center' },
};

const btn = bg => ({
  padding: '8px 20px', background: bg, color: '#fff',
  border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 18,
});

export default App;