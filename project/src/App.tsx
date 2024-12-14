import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/auth/LoginPage';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Map from './pages/Map';
import Requests from './pages/Requests';
import PrivateListings from './pages/PrivateListings';
import CreateRequest from './pages/Requests/CreateRequest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="events" element={<Events />} />
          <Route path="map" element={<Map />} />
          <Route path="requests" element={<Requests />} />
          <Route path="requests/create" element={<CreateRequest />} />
          <Route path="private-listings" element={<PrivateListings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;