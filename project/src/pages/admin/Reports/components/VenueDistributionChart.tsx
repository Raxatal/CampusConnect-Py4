import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface VenueDistributionProps {
  data: { [key: string]: number };
  total: number;
}

const VenueDistributionChart: React.FC<VenueDistributionProps> = ({ data, total }) => {
  const chartData = Object.entries(data)
    .map(([name, value]) => ({
      name,
      value,
      percentage: ((value / total) * 100).toFixed(1)
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={150}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value} events (${chartData.find(item => item.value === value)?.percentage}%)`,
              'Events'
            ]}
            contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem' }}
          />
          <Bar 
            dataKey="value" 
            fill="#3b82f6"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VenueDistributionChart;