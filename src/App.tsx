import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/page';
import Footer from './components/Footer/page';
import Home from './pages/Home/page';
import Login from './pages/Login/page';
import Signup from './pages/Signup/page';
import Dashboard from './pages/Dashboard/page';
import Services from './pages/Services/page';
import Contact from './pages/Contact/page';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
