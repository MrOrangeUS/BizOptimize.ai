import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import BusinessIntro from './components/BusinessIntro';
import SurveyLoop from './components/SurveyLoop';
import Summary from './components/Summary';
import RoadmapView from './components/RoadmapView';
import AdminDashboard from './components/AdminDashboard';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<BusinessIntro />} />
        <Route path="/survey/:sid" element={<SurveyLoop />} />
        <Route path="/summary/:sid" element={<Summary />} />
        <Route path="/roadmap/:sid" element={<RoadmapView />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
