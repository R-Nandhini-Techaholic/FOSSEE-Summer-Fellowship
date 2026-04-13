const { useState, useEffect, useCallback } = React;

function Card({ children, className = "" }) {
  return (
    <div className={`react-card ${className}`}>
      {children}
    </div>
  );
}

function FormInput({ label, name, type = "text", value, onChange, error, required, placeholder, options, asSelect = false }) {
  const errorId = `${name}-error`;
  const [touched, setTouched] = useState(false);

  const handleBlur = () => setTouched(true);

  // Show error only if form submitted (external error override) or user has touched the field.
  const displayError = (touched || error?.includes('must be exactly 10 digits') || error?.includes('Passwords do not match')) ? error : null;

  return (
    <div className="react-form-group">
      {label && (
        <label className="react-label" htmlFor={name}>
          {label} {required && <span className="react-required" aria-hidden="true">*</span>}
        </label>
      )}

      {asSelect ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          className={`react-select ${displayError ? 'has-error' : ''}`}
          required={required}
          aria-invalid={!!displayError}
          aria-describedby={displayError ? errorId : undefined}
        >
          {options && options.map((opt, i) => (
            <option key={i} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          className={`react-input ${displayError ? 'has-error' : ''}`}
          placeholder={placeholder}
          required={required}
          aria-invalid={!!displayError}
          aria-describedby={displayError ? errorId : undefined}
        />
      )}

      <div aria-live="polite" aria-atomic="true">
        {displayError && <div id={errorId} className="react-error-msg">{displayError}</div>}
      </div>
    </div>
  );
}

function Button({ children, type = "button", onClick, loading = false, disabled = false, className = "react-btn-primary", style }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`react-btn ${className}`}
      style={style}
      aria-disabled={loading || disabled}
    >
      {loading && <span className="spinner" aria-hidden="true"></span>}
      {loading ? 'Processing...' : children}
    </button>
  );
}

function AlertMessage({ message, type = "error" }) {
  if (!message) return null;
  return (
    <div className={`react-alert react-alert-${type}`}>
      {message}
    </div>
  );
}

function FormSection({ title, children }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

// Global Toast System Logic
let toastIdCtr = 0;
let addToastGlobal = null;

function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    addToastGlobal = (message, type = 'success') => {
      const id = ++toastIdCtr;
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 4000);
    };
  }, []);

  return (
    <div className="react-toast-container" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`react-toast react-toast-${t.type}`}>
          {t.type === 'success' ? '✅' : '⚠️'} {t.message}
        </div>
      ))}
    </div>
  );
}

window.showToast = (msg, type = 'success') => {
  if (addToastGlobal) addToastGlobal(msg, type);
};

function InstitutionalLogos({ variant = 'navbar' }) {
  const ctx = window.DJANGO_CONTEXT || {};
  const baseUrl = ctx.staticUrl || '/static/workshop_app/';
  const iitbPath = `${baseUrl}img/iitb_logo.png`;
  const fosseePath = `${baseUrl}img/fossee_logo.png`;

  return (
    <div className={`inst-logos-container inst-logos-${variant}`}>
      <img src={iitbPath} alt="IIT Bombay Logo" className={`inst-logo inst-logo-${variant}`} />
      <img src={fosseePath} alt="FOSSEE Logo" className={`inst-logo inst-logo-${variant}`} />
    </div>
  );
}

window.ReactComponents = { Card, FormInput, Button, AlertMessage, FormSection, ToastContainer, InstitutionalLogos };
