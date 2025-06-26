import Login from '../components/Login';
import BusinessIntro from '../components/BusinessIntro';
import SurveyLoop from '../components/SurveyLoop';
import Summary from '../components/Summary';
import RoadmapView from '../components/RoadmapView';
import AdminDashboard from '../components/AdminDashboard';
import RequireAuth from '../components/RequireAuth';

export const routes = [
  { path: '/login', element: <Login /> },
  {
    element: <RequireAuth />, children: [
      { path: '/', element: <BusinessIntro /> },
      { path: '/survey/:sid', element: <SurveyLoop /> },
      { path: '/summary/:sid', element: <Summary /> },
      { path: '/roadmap/:sid', element: <RoadmapView /> },
      { path: '/admin', element: <AdminDashboard /> },
    ]
  }
];
