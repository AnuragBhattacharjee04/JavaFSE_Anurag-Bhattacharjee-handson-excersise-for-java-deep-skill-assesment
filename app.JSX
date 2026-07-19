import React, { useState } from 'react';
const COURSES  = ['', 'Java Full Stack', 'React Frontend', 'Spring Boot', 'DevOps', 'Cloud AWS', 'Data Science'];
const STATES   = ['', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Gujarat', 'West Bengal'];
const GENDERS  = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

const INITIAL_FORM = {
  firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '',
  dob: '', gender: '', address: '', state: '', pincode: '',
  course: '', experience: '', batch: '', salary: '',
  hearFrom: [], terms: false, newsletter: false,
};
function validate(form) {
  const errors = {};
  if (!form.firstName.trim() || form.firstName.length < 2)
    errors.firstName = 'First name must be at least 2 characters';
  if (!form.lastName.trim())
    errors.lastName = 'Last name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
    errors.email = 'Enter a valid email address';
  if (!/^\d{10}$/.test(form.phone))
    errors.phone = 'Phone must be exactly 10 digits';
  if (form.password.length < 8)
    errors.password = 'Password must be at least 8 characters';
  if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(form.password))
    errors.password = 'Must include uppercase, number, and special character';
  if (form.password !== form.confirmPassword)
    errors.confirmPassword = 'Passwords do not match';
  if (!form.dob)
    errors.dob = 'Date of birth is required';
  else {
    const age = new Date().getFullYear() - new Date(form.dob).getFullYear();
    if (age < 18) errors.dob = 'You must be at least 18 years old';
  }
  if (!form.gender)    errors.gender    = 'Please select a gender';
  if (!form.address.trim()) errors.address = 'Address is required';
  if (!form.state)     errors.state     = 'Please select a state';
  if (!/^\d{6}$/.test(form.pincode))
    errors.pincode = 'Pincode must be 6 digits';
  if (!form.course)    errors.course    = 'Please select a course';
  if (!form.experience) errors.experience = 'Please select experience level';
  if (form.hearFrom.length === 0)
    errors.hearFrom = 'Please select at least one option';
  if (!form.terms)
    errors.terms = 'You must accept the Terms & Conditions';
  return errors;
}
function Field({ label, required, error, children }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      {children}
      {error && <span style={styles.errorText}>⚠ {error}</span>}
    </div>
  );
}
function PasswordStrength({ password }) {
  let strength = 0;
  if (password.length >= 8)           strength++;
  if (/[A-Z]/.test(password))         strength++;
  if (/[0-9]/.test(password))         strength++;
  if (/[!@#$%^&*]/.test(password))    strength++;

  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', '#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

  if (!password) return null;
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= strength ? colors[strength] : '#e2e8f0' }} />
        ))}
      </div>
      <span style={{ fontSize: 12, color: colors[strength], fontWeight: 600 }}>
        {labels[strength]}
      </span>
    </div>
  );
}
function SuccessScreen({ formData, onReset }) {
  return (
    <div style={styles.successScreen}>
      <div style={{ fontSize: 64 }}>🎉</div>
      <h2 style={{ color: '#10b981' }}>Registration Successful!</h2>
      <p>Welcome, <strong>{formData.firstName} {formData.lastName}</strong>!</p>
      <p>You've enrolled in <strong>{formData.course}</strong>.</p>
      <p>A confirmation email has been sent to <strong>{formData.email}</strong>.</p>
      <button onClick={onReset} style={{ ...styles.submitBtn, marginTop: 20 }}>
        Register Another
      </button>
    </div>
  );
}
function App() {
  const [form,      setForm]      = useState(INITIAL_FORM);
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [step,      setStep]      = useState(1);  

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;

    if (type === 'checkbox' && name === 'hearFrom') {
      setForm(prev => ({
        ...prev,
        hearFrom: checked
          ? [...prev.hearFrom, value]
          : prev.hearFrom.filter(v => v !== value),
      }));
    } else if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const inp = (name) => ({
    name,
    value: form[name],
    onChange: handleChange,
    style: { ...styles.input, borderColor: errors[name] ? '#ef4444' : '#d1d5db' },
  });

  const validateStep = () => {
    const all = validate(form);
    const stepFields = {
      1: ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword', 'dob', 'gender'],
      2: ['address', 'state', 'pincode', 'course', 'experience'],
      3: ['hearFrom', 'terms'],
    };
    const stepErrors = {};
    stepFields[step].forEach(f => { if (all[f]) stepErrors[f] = all[f]; });
    setErrors(prev => ({ ...prev, ...stepErrors }));
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext  = () => { if (validateStep()) setStep(s => s + 1); };
  const handleBack  = () => setStep(s => s - 1);
  const handleReset = () => { setForm(INITIAL_FORM); setErrors({}); setSubmitted(false); setStep(1); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) setSubmitted(true);
  };

  if (submitted) return <div style={styles.container}><SuccessScreen formData={form} onReset={handleReset} /></div>;
  const STEP_LABELS = ['Personal Info', 'Course & Address', 'Preferences & Submit'];

  return (
    <div style={styles.container}>
      <h1 style={{ color: '#1e3a8a', marginBottom: 6 }}>HOL 9: React Forms</h1>
      <p style={{ color: '#6b7280', marginBottom: 24 }}>DN 5.0 Course Registration — Multi-Step Form</p>

      {/* Step Indicator */}
      <div style={styles.stepRow}>
        {STEP_LABELS.map((label, i) => (
          <React.Fragment key={label}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', margin: '0 auto 4px',
                background: i + 1 <= step ? '#2563eb' : '#e2e8f0',
                color: i + 1 <= step ? '#fff' : '#9ca3af',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
              }}>
                {i + 1 < step ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 12, color: i + 1 === step ? '#2563eb' : '#6b7280', fontWeight: i + 1 === step ? 600 : 400 }}>
                {label}
              </span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 3, background: i + 1 < step ? '#2563eb' : '#e2e8f0', marginBottom: 20, marginTop: 16 }} />}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>

        {/* ── STEP 1: Personal Info ── */}
        {step === 1 && (
          <>
            <h2 style={styles.stepTitle}>Step 1: Personal Information</h2>
            <div style={styles.row}>
              <Field label="First Name" required error={errors.firstName}>
                <input {...inp('firstName')} placeholder="Priya" />
              </Field>
              <Field label="Last Name" required error={errors.lastName}>
                <input {...inp('lastName')} placeholder="Sharma" />
              </Field>
            </div>
            <div style={styles.row}>
              <Field label="Email Address" required error={errors.email}>
                <input {...inp('email')} type="email" placeholder="priya@example.com" />
              </Field>
              <Field label="Phone Number" required error={errors.phone}>
                <input {...inp('phone')} placeholder="10-digit mobile" maxLength={10} />
              </Field>
            </div>
            <div style={styles.row}>
              <Field label="Password" required error={errors.password}>
                <input {...inp('password')} type="password" placeholder="Min 8 chars" />
                <PasswordStrength password={form.password} />
              </Field>
              <Field label="Confirm Password" required error={errors.confirmPassword}>
                <input {...inp('confirmPassword')} type="password" placeholder="Repeat password" />
              </Field>
            </div>
            <div style={styles.row}>
              <Field label="Date of Birth" required error={errors.dob}>
                <input {...inp('dob')} type="date" />
              </Field>
              <Field label="Gender" required error={errors.gender}>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 4 }}>
                  {GENDERS.map(g => (
                    <label key={g} style={styles.radioLabel}>
                      <input type="radio" name="gender" value={g}
                        checked={form.gender === g} onChange={handleChange} />
                      {g}
                    </label>
                  ))}
                </div>
                {errors.gender && <span style={styles.errorText}>⚠ {errors.gender}</span>}
              </Field>
            </div>
          </>
        )}

        {/* ── STEP 2: Course & Address ── */}
        {step === 2 && (
          <>
            <h2 style={styles.stepTitle}>Step 2: Course & Address</h2>
            <Field label="Select Course" required error={errors.course}>
              <select name="course" value={form.course} onChange={handleChange}
                style={{ ...styles.input, borderColor: errors.course ? '#ef4444' : '#d1d5db' }}>
                {COURSES.map(c => <option key={c} value={c}>{c || '-- Select a course --'}</option>)}
              </select>
            </Field>
            <Field label="Experience Level" required error={errors.experience}>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 4 }}>
                {['Fresher (0-1 yr)', 'Junior (1-3 yrs)', 'Mid (3-6 yrs)', 'Senior (6+ yrs)'].map(e => (
                  <label key={e} style={styles.radioLabel}>
                    <input type="radio" name="experience" value={e}
                      checked={form.experience === e} onChange={handleChange} />
                    {e}
                  </label>
                ))}
              </div>
              {errors.experience && <span style={styles.errorText}>⚠ {errors.experience}</span>}
            </Field>
            <Field label="Full Address" required error={errors.address}>
              <textarea {...inp('address')} rows={3} placeholder="Flat no, Street, City"
                style={{ ...styles.input, resize: 'vertical' }} />
            </Field>
            <div style={styles.row}>
              <Field label="State" required error={errors.state}>
                <select name="state" value={form.state} onChange={handleChange}
                  style={{ ...styles.input, borderColor: errors.state ? '#ef4444' : '#d1d5db' }}>
                  {STATES.map(s => <option key={s} value={s}>{s || '-- Select state --'}</option>)}
                </select>
              </Field>
              <Field label="Pincode" required error={errors.pincode}>
                <input {...inp('pincode')} placeholder="6-digit pincode" maxLength={6} />
              </Field>
            </div>
          </>
        )}

        {/* ── STEP 3: Preferences & Submit ── */}
        {step === 3 && (
          <>
            <h2 style={styles.stepTitle}>Step 3: Preferences & Submit</h2>
            <Field label="Preferred Batch" error={errors.batch}>
              <select name="batch" value={form.batch} onChange={handleChange} style={styles.input}>
                {['', 'Weekday Morning (9AM–12PM)', 'Weekday Evening (6PM–9PM)', 'Weekend (10AM–2PM)'].map(b => (
                  <option key={b} value={b}>{b || '-- Select batch (optional) --'}</option>
                ))}
              </select>
            </Field>
            <Field label="How did you hear about us?" required error={errors.hearFrom}>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 4 }}>
                {['LinkedIn', 'College', 'Friend', 'Google', 'Cognizant Portal'].map(src => (
                  <label key={src} style={styles.radioLabel}>
                    <input type="checkbox" name="hearFrom" value={src}
                      checked={form.hearFrom.includes(src)} onChange={handleChange} />
                    {src}
                  </label>
                ))}
              </div>
            </Field>
            {/* Review Summary */}
            <div style={styles.reviewBox}>
              <h4 style={{ margin: '0 0 10px' }}>📋 Registration Summary</h4>
              {[
                ['Name',       `${form.firstName} ${form.lastName}`],
                ['Email',      form.email],
                ['Phone',      form.phone],
                ['Course',     form.course],
                ['Experience', form.experience],
                ['State',      form.state],
              ].map(([k, v]) => v && (
                <div key={k} style={styles.reviewRow}>
                  <span style={{ color: '#6b7280' }}>{k}</span>
                  <strong>{v}</strong>
                </div>
              ))}
            </div>
            <label style={{ ...styles.radioLabel, display: 'flex', marginBottom: 10 }}>
              <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
              <span style={{ marginLeft: 8 }}>
                I accept the <a href="#" style={{ color: '#2563eb' }}>Terms & Conditions</a> and{' '}
                <a href="#" style={{ color: '#2563eb' }}>Privacy Policy</a> *
              </span>
            </label>
            {errors.terms && <span style={styles.errorText}>⚠ {errors.terms}</span>}
            <label style={{ ...styles.radioLabel, display: 'flex' }}>
              <input type="checkbox" name="newsletter" checked={form.newsletter} onChange={handleChange} />
              <span style={{ marginLeft: 8 }}>Subscribe to newsletter and updates</span>
            </label>
          </>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          {step > 1 && (
            <button type="button" onClick={handleBack}
              style={{ ...styles.submitBtn, background: '#6b7280', flex: 1 }}>
              ← Back
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={handleNext}
              style={{ ...styles.submitBtn, flex: 2 }}>
              Next →
            </button>
          ) : (
            <button type="submit" style={{ ...styles.submitBtn, background: '#10b981', flex: 2 }}>
              ✅ Submit Registration
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
const styles = {
  container:    { fontFamily: "'Segoe UI', Arial, sans-serif", maxWidth: 720, margin: '0 auto', padding: 24, color: '#1e293b' },
  form:         { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 28 },
  stepRow:      { display: 'flex', alignItems: 'center', marginBottom: 28 },
  stepTitle:    { color: '#1e3a8a', margin: '0 0 20px', fontSize: 18 },
  row:          { display: 'flex', gap: 16, flexWrap: 'wrap' },
  field:        { flex: 1, minWidth: 220, marginBottom: 16 },
  label:        { display: 'block', fontWeight: 600, fontSize: 14, color: '#374151', marginBottom: 6 },
  input:        { width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid', fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#fff' },
  errorText:    { display: 'block', color: '#dc2626', fontSize: 12, marginTop: 4 },
  radioLabel:   { display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, cursor: 'pointer' },
  submitBtn:    { padding: '11px 0', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 15, fontWeight: 600 },
  reviewBox:    { background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: 16, marginBottom: 16 },
  reviewRow:    { display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 },
  successScreen:{ textAlign: 'center', background: '#f0fdf4', border: '2px solid #86efac', borderRadius: 12, padding: 40 },
};

export default App;