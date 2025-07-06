import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Welcome from './components/Welcome';
import KidsPracticePage from './components/kids';
import Adult from './components/Adult';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/practice/:age/:level" element={<KidsPracticePage />} />

        <Route path="/Adult/:level" element={<Adult />} />
      </Routes>
    </Router>
  );
}

export default App;
