import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Layout from './components/Layout';
import LoginPage from './pages/auth/LoginPage';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Map from './pages/Map';
import Requests from './pages/Requests';
import PrivateListings from './pages/PrivateListings';
import CreateRequest from './pages/Requests/CreateRequest';
import EventRequests from './pages/admin/EventRequests';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="events" element={<Events />} />
            <Route path="map" element={<Map />} />
            <Route path="requests" element={<Requests />} />
            <Route path="requests/create" element={<CreateRequest />} />
            <Route path="private-listings" element={<PrivateListings />} />
            <Route path="admin/event-requests" element={
              <AdminRoute>
                <EventRequests />
              </AdminRoute>
            } />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;