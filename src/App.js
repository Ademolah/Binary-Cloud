

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Docs from './pages/Docs';
import Auth from './pages/Auth';
import CLITools from './pages/CLITools';

import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/Home";
import Deployments from "./pages/dashboard/Deployments";
import Billing from "./pages/dashboard/Billing";
import Usage from "./pages/dashboard/Usage";
import Settings from "./pages/dashboard/Settings";
import Profile from './pages/dashboard/Profile';

import { Toaster } from 'react-hot-toast';
import PublicLayout from './components/layouts/PublicLayout';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Pages wrapped with PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path='/dashboard/profile' element={<Profile/>} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/cli" element={<CLITools />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/auth" element={<Auth />} />
        </Route>

        {/* Dashboard Pages */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="home" element={<DashboardHome />} />
          <Route path="deployments" element={<Deployments />} />
          <Route path="billing" element={<Billing />} />
          <Route path="usage" element={<Usage />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

