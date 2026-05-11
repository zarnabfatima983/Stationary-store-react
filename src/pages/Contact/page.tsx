import { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    alert(`Thank you, ${name}! Your message has been sent.`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="form-box">
      <h2>Contact Us</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        rows={5}
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="contact-textarea"
      />
      <button onClick={handleSubmit}>Send Message</button>
    </div>
  );
};

export default Contact;
