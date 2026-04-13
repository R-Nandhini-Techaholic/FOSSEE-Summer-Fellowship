const { useState } = React;
const { Card, FormInput, Button, AlertMessage, ToastContainer } = window.ReactComponents;

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const ctx = window.DJANGO_CONTEXT || {};
  const errors = ctx.formErrors || [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    // Show feedback before standard Django POST submit happens
    if (formData.username && formData.password) {
      window.showToast("Authenticating...", "success");
      setLoading(true);
    }
  };

  return (
    <>
      <div style={{ marginTop: '40px' }}>
        <window.ReactComponents.InstitutionalLogos variant="auth" />
      </div>
      <Card className="login-card" style={{ marginTop: '0' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Welcome Back</h2>
          <p style={{ margin: '8px 0 0', color: 'var(--text-muted)' }}>Login to continue</p>
        </div>

        {errors.map((err, i) => (
          <AlertMessage key={i} message={err} />
        ))}

        <form method="post" onSubmit={handleSubmit}>
          <input type="hidden" name="csrfmiddlewaretoken" value={ctx.csrfToken} />

          <FormInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required={true}
            placeholder="Enter your username"
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
            placeholder="Enter your password"
          />

          <div style={{ marginTop: '24px' }}>
            <Button type="submit" loading={loading} className="react-btn-primary">
              Sign In
            </Button>
          </div>

          <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href={ctx.urls.register} style={{ color: 'var(--primary)', textDecoration: 'none' }}>New around here? Sign up</a>
            <a href={ctx.urls.passwordReset} style={{ color: 'var(--primary)', textDecoration: 'none' }}>Forgot password?</a>
          </div>
        </form>
        <ToastContainer />
      </Card>
    </>
  );
}

window.ReactComponents = window.ReactComponents || {};
window.ReactComponents.LoginForm = LoginForm;
