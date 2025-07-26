import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Docs from './pages/Docs';
import CLITools from './pages/CLITools';

import Layout from './components/layouts/Layout';

function App() {
  return (
    <Router>
      <Routes>
          <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/clitools" element={<CLITools />} />
          <Route path="/docs" element={<Docs />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
