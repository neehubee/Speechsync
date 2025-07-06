import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Login from './components/Login';
import Welcome from './components/Welcome';
import KidsPracticePage from './components/kids';
import Adult from './components/Adult';

const PracticeWrapper = () => {
  const { age } = useParams();
  return age === 'kids' ? <KidsPracticePage /> : <Adult />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/practice/:age/:level" element={<PracticeWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
