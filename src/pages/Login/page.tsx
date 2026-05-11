import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const loginUser = () => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    const users: { name: string; email: string; password: string; role: string }[] =
      JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem('loggedInUser', JSON.stringify(found));
      alert(`Welcome back, ${found.name}!`);
      navigate('/');
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  const loginAsAdmin = () => {
    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({ name: 'Admin', role: 'admin' })
    );
    navigate('/dashboard');
  };

  return (
    <>
      <div className="auth-hero">
        <h1>🔒 Welcome Back</h1>
        <p>Sign in to manage your orders and access the dashboard</p>
      </div>

      <div className="auth-box">
        <div className="auth-tabs">
          <Link to="/login" className="auth-tab active">Login</Link>
          <Link to="/signup" className="auth-tab">Signup</Link>
        </div>

        <h2>Sign In</h2>

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="auth-options">
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />{' '}
            Remember me
          </label>
          <a href="#">Forgot Password?</a>
        </div>

        <button className="auth-btn" onClick={loginUser}>
          🔒 Login
        </button>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button className="auth-btn-outline" onClick={loginAsAdmin}>
          📊 Login as Admin (Dashboard)
        </button>

        <p className="form-link">
          No account? <Link to="/signup">Create one here</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
