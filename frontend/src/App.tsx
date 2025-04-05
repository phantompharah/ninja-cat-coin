import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Navbar, Image, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUpload from './components/FileUpload';

// Import your components here
const Home = () => (
  <div className="p-4 text-light">
    <h1>Welcome to Your App</h1>
    <p>This is a boilerplate React application with Bootstrap styling.</p>
    
    <Row className="mt-4">
      <Col md={6} className="mx-auto">
        <FileUpload />
      </Col>
    </Row>
  </div>
);

function App() {
  return (
    <Router>
      <div className="bg-dark min-vh-100">
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
          <Container fluid>
            <Navbar.Brand href="/">
              <Image 
                src="/images/logo.jpg" 
                alt="Logo" 
                width="80" 
                height="80" 
                className="d-inline-block align-top me-2"
              />
              Welcome to the World of Ninja Cat
            </Navbar.Brand>
          </Container>
        </Navbar>
        
        <Container fluid className="p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<div className="p-4 text-light"><h1>About Us</h1><p>Learn more about our company.</p></div>} />
            <Route path="/services" element={<div className="p-4 text-light"><h1>Our Services</h1><p>Explore what we offer.</p></div>} />
            <Route path="/contact" element={<div className="p-4 text-light"><h1>Contact Us</h1><p>Get in touch with our team.</p></div>} />
            <Route path="/dashboard" element={<div className="p-4 text-light"><h1>Dashboard</h1><p>View your dashboard.</p></div>} />
            <Route path="/profile" element={<div className="p-4 text-light"><h1>Profile</h1><p>Manage your profile.</p></div>} />
            <Route path="/settings" element={<div className="p-4 text-light"><h1>Settings</h1><p>Configure your settings.</p></div>} />
            <Route path="/help" element={<div className="p-4 text-light"><h1>Help</h1><p>Get assistance.</p></div>} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App; 