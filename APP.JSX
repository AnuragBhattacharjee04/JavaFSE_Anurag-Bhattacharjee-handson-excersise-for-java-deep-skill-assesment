
import React, { useState, useEffect } from 'react';
function AuthPanel({ isLoggedIn, username, onToggle }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Pattern 1: Ternary Operator</h3>
      {isLoggedIn ? (
        <div style={styles.successBox}>
          <p style={{ margin: 0, fontSize: 18 }}>👋 Welcome back, <strong>{username}</strong>!</p>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: '#166534' }}>You are logged in.</p>
          <button onClick={onToggle} style={{ ...styles.btn('#ef4444'), marginTop: 10 }}>Logout</button>
        </div>
      ) : (
        <div style={styles.warnBox}>
          <p style={{ margin: 0 }}>🔒 You are not logged in.</p>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: '#92400e' }}>Please log in to continue.</p>
          <button onClick={onToggle} style={{ ...styles.btn('#2563eb'), marginTop: 10 }}>Login</button>
        </div>
      )}
    </div>
  );
}

function NotificationPanel({ count, messages, onClear }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Pattern 2: && Short-Circuit</h3>

      {/* Only renders if count > 0 */}
      {count > 0 && (
        <div style={styles.infoBox}>
          🔔 You have <strong>{count}</strong> unread notification{count > 1 ? 's' : ''}
        </div>
      )}

      {count === 0 && (
        <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>✅ All caught up — no new notifications.</p>
      )}

      {/* Render list only when messages exist */}
      {messages.length > 0 && (
        <ul style={{ paddingLeft: 18, margin: '10px 0 0' }}>
          {messages.map((m, i) => (
            <li key={i} style={{ marginBottom: 4, fontSize: 14 }}>{m}</li>
          ))}
        </ul>
      )}

      {count > 0 && (
        <button onClick={onClear} style={{ ...styles.btn('#6b7280'), marginTop: 10 }}>
          Mark all as read
        </button>
      )}
    </div>
  );
}
function DataLoader({ status, data }) {
  // Guard clauses — early returns based on state
  if (status === 'idle')    return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Pattern 3: Early Return</h3>
      <p style={{ color: '#6b7280' }}>📭 Click a button to fetch data.</p>
    </div>
  );

  if (status === 'loading') return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Pattern 3: Early Return</h3>
      <div style={{ textAlign: 'center', padding: 20 }}>
        <div style={styles.spinner} />
        <p style={{ color: '#6b7280', marginTop: 10 }}>Loading data...</p>
      </div>
    </div>
  );

  if (status === 'error') return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Pattern 3: Early Return</h3>
      <div style={styles.errorBox}>
        ❌ Failed to load data. Please try again.
      </div>
    </div>
  );
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Pattern 3: Early Return</h3>
      <div style={styles.successBox}>
        <p style={{ margin: 0, fontWeight: 600 }}>✅ Data loaded successfully!</p>
        <ul style={{ margin: '10px 0 0', paddingLeft: 18 }}>
          {data.map((item, i) => <li key={i} style={{ marginBottom: 4 }}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}
const ROLE_CONFIG = {
  admin:  {
    icon: '👑', label: 'Administrator', color: '#7c3aed',
    bg: '#f5f3ff', permissions: ['View', 'Create', 'Edit', 'Delete', 'Manage Users', 'Settings'],
    description: 'Full access to all system features and user management.',
  },
  editor: {
    icon: '✏️', label: 'Editor', color: '#2563eb',
    bg: '#eff6ff', permissions: ['View', 'Create', 'Edit'],
    description: 'Can create and edit content but cannot delete or manage users.',
  },
  viewer: {
    icon: '👁️', label: 'Viewer', color: '#059669',
    bg: '#ecfdf5', permissions: ['View'],
    description: 'Read-only access. Cannot modify any content.',
  },
  guest: {
    icon: '👤', label: 'Guest', color: '#6b7280',
    bg: '#f9fafb', permissions: [],
    description: 'Not authenticated. Please log in to access content.',
  },
};

function RoleBasedUI({ role }) {
  const config = ROLE_CONFIG[role] || ROLE_CONFIG.guest;
  return (
    <div style={{ ...styles.card, background: config.bg, borderLeft: `4px solid ${config.color}` }}>
      <h3 style={styles.cardTitle}>Pattern 4: Object Map (Role-based UI)</h3>
      <p style={{ fontSize: 22, margin: '0 0 6px' }}>
        {config.icon} <strong style={{ color: config.color }}>{config.label}</strong>
      </p>
      <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 10px' }}>{config.description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {config.permissions.length > 0
          ? config.permissions.map(p => (
              <span key={p} style={{ background: config.color, color: '#fff', padding: '2px 10px', borderRadius: 12, fontSize: 12 }}>
                {p}
              </span>
            ))
          : <span style={{ color: '#9ca3af', fontSize: 13, fontStyle: 'italic' }}>No permissions</span>
        }
      </div>
    </div>
  );
}
const ORDER_STEPS = ['Placed', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];

function OrderTracker({ step }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Pattern 5: Complex Conditional — Order Tracker</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 12 }}>
        {ORDER_STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', margin: '0 auto 4px',
                background: i < step ? '#10b981' : i === step ? '#2563eb' : '#e2e8f0',
                color: i <= step ? '#fff' : '#9ca3af',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: 14,
              }}>
                {i < step ? '✓' : i + 1}
              </div>
              <p style={{ margin: 0, fontSize: 10, color: i === step ? '#2563eb' : '#6b7280', fontWeight: i === step ? 600 : 400 }}>
                {s}
              </p>
            </div>
            {i < ORDER_STEPS.length - 1 && (
              <div style={{ height: 3, flex: 1, background: i < step ? '#10b981' : '#e2e8f0', marginBottom: 20 }} />
            )}
          </React.Fragment>
        ))}
      </div>
      {step === ORDER_STEPS.length
        ? <div style={styles.successBox}>🎉 Your order has been delivered!</div>
        : <div style={styles.infoBox}>📦 Current status: <strong>{ORDER_STEPS[step]}</strong></div>
      }
    </div>
  );
}
function App() {
  const [loggedIn,    setLoggedIn]    = useState(false);
  const [notifCount,  setNotifCount]  = useState(4);
  const [dataStatus,  setDataStatus]  = useState('idle');
  const [data,        setData]        = useState([]);
  const [role,        setRole]        = useState('viewer');
  const [orderStep,   setOrderStep]   = useState(2);

  const messages = notifCount > 0
    ? ['📧 New message from HR', '📋 Assignment due tomorrow', '🔔 System maintenance tonight', '🎉 Team celebration on Friday!'].slice(0, notifCount)
    : [];

  const simulateFetch = (outcome) => {
    setDataStatus('loading');
    setData([]);
    setTimeout(() => {
      if (outcome === 'success') {
        setDataStatus('success');
        setData(['Alice Johnson — Java Developer', 'Bob Smith — React Engineer', 'Carol White — DevOps Lead', 'David Brown — Cloud Architect']);
      } else {
        setDataStatus('error');
      }
    }, 1500);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", maxWidth: 900, margin: '0 auto', padding: 24, color: '#1e293b' }}>
      <h1 style={{ color: '#1e3a8a' }}>HOL 7: Conditional Rendering</h1>

      {/* Controls */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 16, marginBottom: 20, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={() => setLoggedIn(v => !v)} style={styles.btn(loggedIn ? '#ef4444' : '#10b981')}>
          {loggedIn ? '🔓 Logout' : '🔑 Login'}
        </button>
        <button onClick={() => setNotifCount(Math.max(0, notifCount - 1))} style={styles.btn('#6b7280')}>
          −1 Notification
        </button>
        <button onClick={() => simulateFetch('success')} style={styles.btn('#10b981')}>Fetch ✓</button>
        <button onClick={() => simulateFetch('error')}   style={styles.btn('#ef4444')}>Fetch ✗</button>
        <button onClick={() => setDataStatus('idle')}    style={styles.btn('#6b7280')}>Reset</button>
        <select value={role} onChange={e => setRole(e.target.value)}
          style={{ padding: '7px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}>
          <option value="admin">Role: Admin</option>
          <option value="editor">Role: Editor</option>
          <option value="viewer">Role: Viewer</option>
          <option value="guest">Role: Guest</option>
        </select>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: '#6b7280' }}>Order Step:</span>
          <input type="range" min={0} max={ORDER_STEPS.length} value={orderStep}
            onChange={e => setOrderStep(Number(e.target.value))} style={{ width: 100 }} />
          <span style={{ fontSize: 13 }}>{orderStep}/{ORDER_STEPS.length}</span>
        </div>
      </div>

      {/* Components */}
      <AuthPanel isLoggedIn={loggedIn} username="Priya" onToggle={() => setLoggedIn(v => !v)} />
      <NotificationPanel count={notifCount} messages={messages} onClear={() => setNotifCount(0)} />
      <DataLoader status={dataStatus} data={data} />
      <RoleBasedUI role={role} />
      <OrderTracker step={orderStep} />
    </div>
  );
}
const styles = {
  card:       { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20, marginBottom: 16 },
  cardTitle:  { margin: '0 0 14px', color: '#374151', fontSize: 16, borderBottom: '1px solid #f1f5f9', paddingBottom: 8 },
  successBox: { background: '#dcfce7', border: '1px solid #86efac', borderRadius: 8, padding: '10px 14px', color: '#166534' },
  warnBox:    { background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 14px', color: '#92400e' },
  infoBox:    { background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: 8, padding: '10px 14px', color: '#1e40af' },
  errorBox:   { background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 8, padding: '10px 14px', color: '#991b1b' },
  spinner:    { width: 36, height: 36, border: '4px solid #e2e8f0', borderTop: '4px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' },
  btn: (bg)  => ({ padding: '7px 16px', background: bg, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500, fontSize: 13 }),
};

export default App;