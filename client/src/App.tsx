import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import LoginPage from './pages/Login/Login';
import SignupPage from './pages/Signup/Signup';
import DashboardPage from './pages/Dashboard/Dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};