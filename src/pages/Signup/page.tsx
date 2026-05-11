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
    if (!name || !email || !phone || !password || !confirm) { alert('Please fill in all fields.'); return; }
    if (password !== confirm) { alert('Passwords do not match.'); return; }
    if (!agreed) { alert('Please agree to the Terms & Conditions.'); return; }
    const users: { name: string; email: string; phone: string; password: string; role: string }[] =
      JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u) => u.email === email)) { alert('Email already registered. Please login.'); return; }
    users.push({ name, email, phone, password, role: 'user' });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully! Please login.');
    navigate('/login');
  };

  const inputCls = 'w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:border-primary';

  const fields = [
    { label: 'Full Name', type: 'text', placeholder: 'Enter your full name', value: name, setter: setName },
    { label: 'Email Address', type: 'email', placeholder: 'Enter your email', value: email, setter: setEmail },
    { label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number', value: phone, setter: setPhone },
    { label: 'Password', type: 'password', placeholder: 'Create a password', value: password, setter: setPassword },
    { label: 'Confirm Password', type: 'password', placeholder: 'Confirm your password', value: confirm, setter: setConfirm },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="text-center py-10 px-5 bg-gradient-to-br from-primary to-secondary text-white">
        <h1 className="text-3xl font-bold mb-2">🔓 Create Account</h1>
        <p className="text-base">Join us and start shopping premium stationery today</p>
      </div>

      <div className="max-w-md mx-auto my-8 mb-12 p-7 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <div className="flex mb-5 rounded-xl overflow-hidden border-2 border-primary">
          <Link to="/login" className="flex-1 text-center py-2.5 font-bold text-sm text-primary dark:text-secondary bg-transparent hover:bg-primary hover:text-white transition-colors">
            Login
          </Link>
          <Link to="/signup" className="flex-1 text-center py-2.5 font-bold text-sm bg-primary text-white">
            Signup
          </Link>
        </div>

        <h2 className="text-xl font-bold text-primary dark:text-secondary mb-5">Register</h2>

        {fields.map(({ label, type, placeholder, value, setter }) => (
          <div key={label} className="mb-3.5">
            <label className="block text-xs font-bold mb-1 text-gray-800 dark:text-gray-200">{label}</label>
            <input type={type} placeholder={placeholder} value={value}
              onChange={(e) => setter(e.target.value)} className={inputCls} />
          </div>
        ))}

        <div className="flex items-center gap-2 text-xs my-2.5 mb-4 text-gray-700 dark:text-gray-300">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="cursor-pointer" />
          <span>I agree to the Terms &amp; Conditions</span>
        </div>

        <button onClick={registerUser}
          className="block w-full py-3 bg-gradient-to-br from-primary to-secondary text-white font-bold rounded-xl text-sm cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-transform">
          🔓 Create Account
        </button>

        <p className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
