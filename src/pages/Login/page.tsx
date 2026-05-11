import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const loginUser = () => {
    if (!email || !password) { alert('Please fill in all fields.'); return; }
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
    localStorage.setItem('loggedInUser', JSON.stringify({ name: 'Admin', role: 'admin' }));
    navigate('/dashboard');
  };

  const inputCls = 'w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:border-primary';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="text-center py-10 px-5 bg-gradient-to-br from-primary to-secondary text-white">
        <h1 className="text-3xl font-bold mb-2">🔒 Welcome Back</h1>
        <p className="text-base">Sign in to manage your orders and access the dashboard</p>
      </div>

      <div className="max-w-md mx-auto my-8 mb-12 p-7 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <div className="flex mb-5 rounded-xl overflow-hidden border-2 border-primary">
          <Link to="/login" className="flex-1 text-center py-2.5 font-bold text-sm bg-primary text-white">
            Login
          </Link>
          <Link to="/signup" className="flex-1 text-center py-2.5 font-bold text-sm text-primary dark:text-secondary bg-transparent hover:bg-primary hover:text-white transition-colors">
            Signup
          </Link>
        </div>

        <h2 className="text-xl font-bold text-primary dark:text-secondary mb-5">Sign In</h2>

        <div className="mb-3.5">
          <label className="block text-xs font-bold mb-1 text-gray-800 dark:text-gray-200">Email Address</label>
          <input type="email" placeholder="Enter your email" value={email}
            onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>

        <div className="mb-3.5">
          <label className="block text-xs font-bold mb-1 text-gray-800 dark:text-gray-200">Password</label>
          <input type="password" placeholder="Enter your password" value={password}
            onChange={(e) => setPassword(e.target.value)} className={inputCls} />
        </div>

        <div className="flex justify-between items-center text-xs my-2.5 mb-4 text-gray-700 dark:text-gray-300">
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            Remember me
          </label>
          <a href="#" className="text-secondary hover:underline">Forgot Password?</a>
        </div>

        <button onClick={loginUser}
          className="block w-full py-3 bg-gradient-to-br from-primary to-secondary text-white font-bold rounded-xl text-sm cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-transform">
          🔒 Login
        </button>

        <div className="relative text-center my-4 text-gray-400 text-xs">
          <span className="relative z-10 bg-white dark:bg-gray-800 px-3">OR</span>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 dark:bg-gray-600 -translate-y-1/2"></div>
        </div>

        <button onClick={loginAsAdmin}
          className="block w-full py-3 bg-transparent text-primary dark:text-secondary border-2 border-primary dark:border-secondary font-bold rounded-xl text-sm cursor-pointer hover:bg-primary dark:hover:bg-secondary hover:text-white transition-colors mt-2">
          📊 Login as Admin (Dashboard)
        </button>

        <p className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
          No account?{' '}
          <Link to="/signup" className="text-secondary font-bold hover:underline">Create one here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
