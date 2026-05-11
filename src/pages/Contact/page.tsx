import { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) { alert('Please fill in all fields.'); return; }
    alert(`Thank you, ${name}! Your message has been sent.`);
    setName(''); setEmail(''); setMessage('');
  };

  const inputCls = 'w-full px-3 py-2.5 mb-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:border-primary';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors py-12">
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-5">Contact Us</h2>
        <input type="text" placeholder="Your Name" value={name}
          onChange={(e) => setName(e.target.value)} className={inputCls} />
        <input type="email" placeholder="Your Email" value={email}
          onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        <textarea rows={5} placeholder="Your Message" value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputCls} resize-y`} />
        <button onClick={handleSubmit}
          className="w-full py-3 bg-primary dark:bg-secondary text-white font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
          Send Message
        </button>
      </div>
    </div>
  );
};

export default Contact;
