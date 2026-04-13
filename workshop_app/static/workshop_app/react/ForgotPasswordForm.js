const { useState } = React;
const { Card, FormInput, Button, AlertMessage, ToastContainer } = window.ReactComponents;

function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const formRef = React.useRef(null);

    const ctx = window.DJANGO_CONTEXT || {};
    const errors = ctx.formErrors || [];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        // UX improvement: Show loading state and delayed submit
        setLoading(true);
        window.showToast("If this email is registered, you will receive a reset link shortly.", "success");

        // Add small delay so the user sees the toast before Django takes over to render the done view.
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.submit();
            }
        }, 1500);
    };

    return (
        <>
            <div style={{ marginTop: '60px' }}>
                <window.ReactComponents.InstitutionalLogos variant="auth" />
            </div>
            <Card className="forgot-password-card" style={{ marginTop: '0', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: 'var(--text-main)' }}>Forgot Password?</h2>
                    <p style={{ margin: '8px 0 0', fontSize: '14px', color: 'var(--text-muted)' }}>
                        Enter your email to receive a reset link
                    </p>
                </div>

                {errors.map((err, i) => (
                    <AlertMessage key={i} message={err} />
                ))}

                <form method="post" onSubmit={handleSubmit} ref={formRef}>
                    <input type="hidden" name="csrfmiddlewaretoken" value={ctx.csrfToken} />

                    <FormInput
                        label="Email address"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                        placeholder="you@example.com"
                    />

                    <div style={{ marginTop: '24px' }}>
                        <Button type="submit" loading={loading} className="react-btn-primary">
                            Send Reset Link
                        </Button>
                    </div>

                    <div style={{ marginTop: '24px', textAlign: 'center' }}>
                        <a href={ctx.urls?.login || "/"} style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
                            Back to login
                        </a>
                    </div>
                </form>
                <ToastContainer />
            </Card>
        </>
    );
}

window.ReactComponents = window.ReactComponents || {};
window.ReactComponents.ForgotPasswordForm = ForgotPasswordForm;
