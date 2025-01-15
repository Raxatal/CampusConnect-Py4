import React, { useEffect, useState } from 'react';
import { BarChart, PieChart, Calendar, MapPin } from 'lucide-react';
import { Event } from '../../../types';
import { getEventAnalytics } from '../../../services/analytics';
import StatusDistributionChart from './components/StatusDistributionChart';
import VenueDistributionChart from './components/VenueDistributionChart';
import MyCSDDistributionChart from './components/MyCSDDistributionChart';

interface EventAnalytics {
  totalEvents: number;
  statusDistribution: {
    approved: number;
    pending: number;
    rejected: number;
    expired: number;
  };
  venueDistribution: {
    [key: string]: number;
  };
  myCSDDistribution: {
    myCSD: number;
    regular: number;
  };
}

const Reports = () => {
  const [analytics, setAnalytics] = useState<EventAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getEventAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  if (!analytics) {
    return <div className="text-center py-8 text-red-600">Failed to load analytics</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Event Analytics Report</h1>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Print Report
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow hover-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Events</h3>
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">{analytics.totalEvents}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Approved Events</h3>
            <BarChart className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold">{analytics.statusDistribution.approved}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Pending Events</h3>
            <PieChart className="w-6 h-6 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold">{analytics.statusDistribution.pending}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Rejected/Expired</h3>
            <PieChart className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-3xl font-bold">
            {analytics.statusDistribution.rejected + analytics.statusDistribution.expired}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Status Distribution</h3>
          </div>
          <StatusDistributionChart data={analytics.statusDistribution} />
        </div>

        {/* MyCSD Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">MyCSD vs Regular Events</h3>
          </div>
          <MyCSDDistributionChart data={analytics.myCSDDistribution} />
        </div>

        {/* Venue Distribution (Full Width) */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Venue Distribution</h3>
          </div>
          <VenueDistributionChart 
            data={analytics.venueDistribution} 
            total={analytics.totalEvents}
          />
        </div>
      </div>
    </div>
  );
};

export default Reports;