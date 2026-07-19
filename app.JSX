
import React, { useState, useMemo } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────
const EMPLOYEES = [
  { id: 1,  name: 'Alice Johnson',  dept: 'Engineering', role: 'Senior Dev',     salary: 95000, skills: ['Java','React','Spring'], active: true  },
  { id: 2,  name: 'Bob Smith',      dept: 'Marketing',   role: 'Manager',        salary: 72000, skills: ['SEO','Analytics'],        active: true  },
  { id: 3,  name: 'Carol White',    dept: 'Engineering', role: 'Lead Dev',       salary: 108000,skills: ['Java','Microservices'],   active: false },
  { id: 4,  name: 'David Brown',    dept: 'HR',          role: 'HR Specialist',  salary: 58000, skills: ['Recruitment','Payroll'],  active: true  },
  { id: 5,  name: 'Eva Martinez',   dept: 'Engineering', role: 'Frontend Dev',   salary: 82000, skills: ['React','TypeScript'],     active: true  },
  { id: 6,  name: 'Frank Lee',      dept: 'Marketing',   role: 'Content Writer', salary: 55000, skills: ['Content','SEO'],         active: false },
  { id: 7,  name: 'Grace Chen',     dept: 'HR',          role: 'HR Manager',     salary: 67000, skills: ['Training','Compliance'],  active: true  },
  { id: 8,  name: 'Hank Wilson',    dept: 'Engineering', role: 'DevOps Eng',     salary: 91000, skills: ['Docker','K8s','CI/CD'],   active: true  },
  { id: 9,  name: 'Iris Davis',     dept: 'Marketing',   role: 'Brand Designer', salary: 63000, skills: ['Figma','Branding'],      active: true  },
  { id: 10, name: 'Jack Thompson',  dept: 'Engineering', role: 'Backend Dev',    salary: 87000, skills: ['Spring','MySQL','AWS'],   active: true  },
];

const DEPTS = ['All', ...new Set(EMPLOYEES.map(e => e.dept))];
function SkillBadge({ skill }) {
  return (
    <span style={styles.badge}>{skill}</span>
  );
}

function EmployeeRow({ emp, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <tr style={{ background: index % 2 === 0 ? '#fff' : '#f8fafc', cursor: 'pointer' }}
          onClick={() => setExpanded(v => !v)}>
        <td style={td}>{emp.id}</td>
        <td style={td}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ ...styles.avatar, background: stringToColor(emp.name) }}>
              {emp.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>{emp.name}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{emp.role}</div>
            </div>
          </div>
        </td>
        <td style={td}>{emp.dept}</td>
        <td style={td}>₹{emp.salary.toLocaleString()}</td>
        <td style={td}>
          <span style={{ ...styles.statusTag, background: emp.active ? '#dcfce7' : '#fee2e2', color: emp.active ? '#166534' : '#991b1b' }}>
            {emp.active ? '● Active' : '● Inactive'}
          </span>
        </td>
        <td style={td}>
          <span style={{ fontSize: 12, color: '#6b7280' }}>{expanded ? '▲ Hide' : '▼ Skills'}</span>
        </td>
      </tr>
      {/* Expanded row: nested list of skills */}
      {expanded && (
        <tr>
          <td colSpan={6} style={{ padding: '8px 16px 12px 70px', background: '#eff6ff' }}>
            <strong style={{ fontSize: 13 }}>Skills:</strong>
            <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
              {/* KEY must be unique within this list */}
              {emp.skills.map(skill => (
                <SkillBadge key={`${emp.id}-${skill}`} skill={skill} />
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function DeptSummaryCard({ dept, employees }) {
  const active    = employees.filter(e => e.active).length;
  const avgSalary = Math.round(employees.reduce((s, e) => s + e.salary, 0) / employees.length);
  const allSkills = [...new Set(employees.flatMap(e => e.skills))];

  return (
    <div style={styles.summaryCard}>
      <h4 style={{ margin: '0 0 8px', color: '#1e3a8a' }}>{dept}</h4>
      <p style={styles.summaryRow}><span>Employees</span><strong>{employees.length}</strong></p>
      <p style={styles.summaryRow}><span>Active</span><strong style={{ color: '#10b981' }}>{active}</strong></p>
      <p style={styles.summaryRow}><span>Avg Salary</span><strong>₹{avgSalary.toLocaleString()}</strong></p>
      <div style={{ marginTop: 8 }}>
        <span style={{ fontSize: 12, color: '#6b7280' }}>Skills:</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
          {allSkills.map(s => <SkillBadge key={s} skill={s} />)}
        </div>
      </div>
    </div>
  );
}
function App() {
  const [search,    setSearch]    = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [activeOnly, setActiveOnly] = useState(false);
  const [sortCol,   setSortCol]   = useState('id');
  const [sortAsc,   setSortAsc]   = useState(true);
  const filtered = useMemo(() => {
    return EMPLOYEES
      .filter(e => deptFilter === 'All' || e.dept === deptFilter)
      .filter(e => !activeOnly || e.active)
      .filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.role.toLowerCase().includes(search.toLowerCase()) ||
        e.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
      )
      .sort((a, b) => {
        const val = typeof a[sortCol] === 'string'
          ? a[sortCol].localeCompare(b[sortCol])
          : a[sortCol] - b[sortCol];
        return sortAsc ? val : -val;
      });
  }, [search, deptFilter, activeOnly, sortCol, sortAsc]);

  const toggleSort = (col) => {
    if (sortCol === col) setSortAsc(v => !v);
    else { setSortCol(col); setSortAsc(true); }
  };

  const SortTh = ({ col, label }) => (
    <th style={{ ...th, cursor: 'pointer', userSelect: 'none' }} onClick={() => toggleSort(col)}>
      {label} {sortCol === col ? (sortAsc ? ' ▲' : ' ▼') : ' ⇅'}
    </th>
  );
  const deptGroups = DEPTS.slice(1).map(dept => ({
    dept,
    employees: EMPLOYEES.filter(e => e.dept === dept),
  }));

  return (
    <div style={styles.container}>
      <h1 style={{ color: '#1e3a8a' }}>HOL 8: Lists & Keys — Employee Directory</h1>

      {/* Controls */}
      <div style={styles.controls}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search by name, role, or skill..."
          style={styles.searchInput}
        />
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} style={styles.select}>
          {DEPTS.map(d => <option key={d} value={d}>{d === 'All' ? '🏢 All Departments' : d}</option>)}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, cursor: 'pointer' }}>
          <input type="checkbox" checked={activeOnly} onChange={e => setActiveOnly(e.target.checked)} />
          Active only
        </label>
        <span style={{ color: '#6b7280', fontSize: 14, marginLeft: 'auto' }}>
          Showing <strong>{filtered.length}</strong> of {EMPLOYEES.length} employees
        </span>
      </div>

      {/* Table — each row needs a unique key */}
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr style={{ background: '#1e3a8a', color: '#fff' }}>
              <SortTh col="id"     label="#"          />
              <SortTh col="name"   label="Name / Role" />
              <SortTh col="dept"   label="Department"  />
              <SortTh col="salary" label="Salary"      />
              <th style={th}>Status</th>
              <th style={th}>Details</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0
              ? filtered.map((emp, i) => (
                  // KEY must be stable and unique — using emp.id (not index)
                  <EmployeeRow key={emp.id} emp={emp} index={i} />
                ))
              : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 30, color: '#9ca3af' }}>
                    😕 No employees match your filters.
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

      {/* Department Summary — nested lists */}
      <h2 style={{ color: '#1e3a8a', marginTop: 32 }}>Department Summary</h2>
      <div style={styles.summaryGrid}>
        {deptGroups.map(({ dept, employees }) => (
          // KEY on outermost element of each iteration
          <DeptSummaryCard key={dept} dept={dept} employees={employees} />
        ))}
      </div>

      {/* Key best practices note */}
      <div style={styles.noteBox}>
        <h4 style={{ margin: '0 0 8px' }}>📝 Key Rules in React</h4>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.8 }}>
          <li><strong>Keys must be unique</strong> among siblings (not globally)</li>
          <li><strong>Never use array index as key</strong> if the list can be reordered/filtered (causes bugs)</li>
          <li><strong>Use stable IDs</strong> from data — e.g., <code>emp.id</code>, <code>uuid</code></li>
          <li>Keys help React identify which items changed, were added, or removed</li>
          <li>Keys do <strong>not</strong> get passed as a prop — use a separate prop if needed</li>
        </ul>
      </div>
    </div>
  );
}
function stringToColor(str) {
  const colors = ['#2563eb','#7c3aed','#0891b2','#059669','#d97706','#dc2626'];
  let hash = 0;
  for (let c of str) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}
const styles = {
  container:   { fontFamily: "'Segoe UI', Arial, sans-serif", maxWidth: 1050, margin: '0 auto', padding: 24, color: '#1e293b' },
  controls:    { display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' },
  searchInput: { padding: '8px 12px', borderRadius: 8, border: '1.5px solid #d1d5db', fontSize: 14, flex: 1, minWidth: 200 },
  select:      { padding: '8px 12px', borderRadius: 8, border: '1.5px solid #d1d5db', fontSize: 14 },
  table:       { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  avatar:      { width: 36, height: 36, borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 16, flexShrink: 0 },
  statusTag:   { padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600 },
  badge:       { background: '#dbeafe', color: '#1d4ed8', padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 500 },
  summaryGrid: { display: 'flex', gap: 16, flexWrap: 'wrap' },
  summaryCard: { flex: 1, minWidth: 220, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 16 },
  summaryRow:  { display: 'flex', justifyContent: 'space-between', margin: '4px 0', fontSize: 14 },
  noteBox:     { background: '#fefce8', border: '1px solid #fde68a', borderRadius: 10, padding: 16, marginTop: 24 },
};
const td = { padding: '10px 14px', borderBottom: '1px solid #f1f5f9' };
const th = { padding: '11px 14px', textAlign: 'left', fontWeight: 600 };

export default App;