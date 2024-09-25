import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import LoginPage from './pages/Login/Login';
import SignupPage from './pages/Signup/Signup';
import DashboardPage from './pages/Dashboard/Dashboard';
import NotFound from './pages/404/404';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Router>
  );
};