import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const registerUser = () => {
    if (!name || !email || !phone || !password || !confirm) {
      alert('Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      alert('Passwords do not match.');
      return;
    }
    if (!agreed) {
      alert('Please agree to the Terms & Conditions.');
      return;
    }

    const users: { name: string; email: string; phone: string; password: string; role: string }[] =
      JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u) => u.email === email)) {
      alert('Email already registered. Please login.');
      return;
    }

    users.push({ name, email, phone, password, role: 'user' });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully! Please login.');
    navigate('/login');
  };

  return (
    <>
      <div className="auth-hero">
        <h1>🔓 Create Account</h1>
        <p>Join us and start shopping premium stationery today</p>
      </div>

      <div className="auth-box">
        <div className="auth-tabs">
          <Link to="/login" className="auth-tab">Login</Link>
          <Link to="/signup" className="auth-tab active">Signup</Link>
        </div>

        <h2>Register</h2>

        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <div className="auth-options">
          <label>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />{' '}
            I agree to the Terms &amp; Conditions
          </label>
        </div>

        <button className="auth-btn" onClick={registerUser}>
          🔓 Create Account
        </button>

        <p className="form-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
