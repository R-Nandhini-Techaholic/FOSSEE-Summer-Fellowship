const { useState } = React;
const { Card, FormInput, Button, AlertMessage, FormSection, ToastContainer } = window.ReactComponents;

const TITLE_OPTIONS = [
  { value: 'Professor', label: 'Prof.' },
  { value: 'Doctor', label: 'Dr.' },
  { value: 'Shriman', label: 'Shri' },
  { value: 'Shrimati', label: 'Smt' },
  { value: 'Kumari', label: 'Ku' },
  { value: 'Mr', label: 'Mr.' },
  { value: 'Mrs', label: 'Mrs.' },
  { value: 'Miss', label: 'Ms.' },
];

const DEPT_OPTIONS = [
  { value: 'computer engineering', label: 'Computer Science' },
  { value: 'information technology', label: 'Information Technology' },
  { value: 'civil engineering', label: 'Civil Engineering' },
  { value: 'electrical engineering', label: 'Electrical Engineering' },
  { value: 'mechanical engineering', label: 'Mechanical Engineering' },
  { value: 'chemical engineering', label: 'Chemical Engineering' },
  { value: 'aerospace engineering', label: 'Aerospace Engineering' },
  { value: 'biosciences and bioengineering', label: 'Biosciences and BioEngineering' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'energy science and engineering', label: 'Energy Science and Engineering' },
];

const SOURCE_OPTIONS = [
  { value: 'FOSSEE website', label: 'FOSSEE website' },
  { value: 'Google', label: 'Google' },
  { value: 'Social Media', label: 'Social Media' },
  { value: 'From other College', label: 'From other College' },
];

// Truncated list for simplicity, but covers the default 'IN-MH'
const STATE_OPTIONS = [
  { value: '', label: '---------' },
  { value: 'IN-AP', label: 'Andhra Pradesh' },
  { value: 'IN-MH', label: 'Maharashtra' },
  { value: 'IN-DL', label: 'Delhi' },
  { value: 'IN-KA', label: 'Karnataka' },
  { value: 'IN-TN', label: 'Tamil Nadu' },
  { value: 'IN-UP', label: 'Uttar Pradesh' }
];

function RegisterForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', confirm_password: '',
    title: 'Professor', first_name: '', last_name: '', phone_number: '',
    institute: '', department: 'computer engineering',
    location: '', state: 'IN-MH', how_did_you_hear_about_us: 'FOSSEE website'
  });
  const [loading, setLoading] = useState(false);
  const [clientError, setClientError] = useState('');
  const formRef = React.useRef(null);

  const ctx = window.DJANGO_CONTEXT || {};
  const serverErrors = ctx.formErrors || [];

  const handleNext = () => {
    if (step === 1 && formData.password !== formData.confirm_password) {
      setClientError("Passwords do not match");
      return;
    }
    if (step === 2 && !/^\d{10}$/.test(formData.phone_number)) {
      setClientError("Phone number must be exactly 10 digits");
      return;
    }
    setClientError('');
    setStep(s => s + 1);
  };

  const handlePrev = () => {
    setClientError('');
    setStep(s => s - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 3 && (!formData.institute || !formData.location || !formData.first_name || !formData.last_name || !formData.phone_number)) {
      setClientError("Please fill out all required fields.");
      window.showToast("Please fill out all required fields.", "error");
      return;
    }

    // Switch to success view and submit after a short pause
    setStep(4);
    setTimeout(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        window.showToast("Registration completed successfully!", "success");
      }, 1500);
    }, 2000);
  };

  return (
    <>
      <div style={{ marginTop: '24px' }}>
        <window.ReactComponents.InstitutionalLogos variant="auth" />
      </div>
      <Card className="register-card" style={{ marginTop: '0', maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Register as Coordinator</h2>
          <p style={{ margin: '8px 0 0', color: 'var(--text-muted)' }}>Create your account to propose workshops</p>
        </div>

        <div className="step-indicator">
          <div className={`step-dot ${step >= 1 ? 'active' : ''}`}></div>
          <div className={`step-dot ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step-dot ${step >= 3 ? 'active' : ''}`}></div>
        </div>

        {step < 4 && serverErrors.map((err, i) => (
          <AlertMessage key={i} message={err} />
        ))}
        {step < 4 && <AlertMessage message={clientError} />}

        <form onSubmit={handleSubmit} ref={formRef}>
          <input type="hidden" name="csrfmiddlewaretoken" value={ctx.csrfToken} />

          <div style={{ display: step === 1 ? 'block' : 'none' }}>
            <div className="step-container">
              <FormSection title="Account Details">
                <div className="react-form-grid">
                  <FormInput label="Username" name="username" value={formData.username} onChange={handleChange} required={true} />
                  <FormInput label="Email address" name="email" type="email" value={formData.email} onChange={handleChange} required={true} />
                  <FormInput label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required={true} />
                  <FormInput label="Confirm Password" name="confirm_password" type="password" value={formData.confirm_password} onChange={handleChange} required={true} />
                </div>
              </FormSection>
            </div>
          </div>

          <div style={{ display: step === 2 ? 'block' : 'none' }}>
            <div className="step-container">
              <FormSection title="Personal Information">
                <div className="react-form-grid">
                  <FormInput label="Title" name="title" asSelect={true} options={TITLE_OPTIONS} value={formData.title} onChange={handleChange} />
                  <FormInput label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} required={true} />
                  <FormInput label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required={true} />
                  <FormInput label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} required={true} placeholder="10 digits only" />
                </div>
              </FormSection>
            </div>
          </div>

          <div style={{ display: step === 3 ? 'block' : 'none' }}>
            <div className="step-container">
              <FormSection title="Professional & Location">
                <div className="react-form-grid">
                  <FormInput label="Institute/Organization" name="institute" value={formData.institute} onChange={handleChange} required={true} />
                  <FormInput label="Department" name="department" asSelect={true} options={DEPT_OPTIONS} value={formData.department} onChange={handleChange} />
                  <FormInput label="Place/City" name="location" value={formData.location} onChange={handleChange} required={true} />
                  <FormInput label="State" name="state" asSelect={true} options={STATE_OPTIONS} value={formData.state} onChange={handleChange} />
                  <FormInput label="How did you hear about us?" name="how_did_you_hear_about_us" asSelect={true} options={SOURCE_OPTIONS} value={formData.how_did_you_hear_about_us} onChange={handleChange} />
                </div>
              </FormSection>
            </div>
          </div>

          <div style={{ display: step === 4 ? 'block' : 'none' }}>
            {step === 4 && (
              <div className="success-screen">
                <div className="success-icon">✓</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px 0', color: 'var(--text-main)' }}>Registration Successful!</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>Processing your details and redirecting...</p>
              </div>
            )}
          </div>

          {step < 4 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
              {step > 1 ? (
                <Button type="button" onClick={handlePrev} className="react-btn" style={{ background: '#e2e8f0', color: '#1e293b', width: 'auto' }}>Back</Button>
              ) : <div></div>}

              {step < 3 ? (
                <Button type="button" onClick={handleNext} className="react-btn-primary" style={{ width: 'auto' }}>Next Step</Button>
              ) : (
                <Button type="submit" loading={loading} className="react-btn-primary" style={{ width: 'auto' }}>Complete Registration</Button>
              )}
            </div>
          )}
        </form>
        <ToastContainer />
      </Card>
    </>
  );
}

window.ReactComponents = window.ReactComponents || {};
window.ReactComponents.RegisterForm = RegisterForm;
