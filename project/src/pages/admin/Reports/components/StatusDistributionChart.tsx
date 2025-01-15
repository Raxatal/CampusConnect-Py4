import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface StatusDistributionProps {
  data: {
    approved: number;
    pending: number;
    rejected: number;
    expired: number;
  };
}

const COLORS = {
  approved: '#22c55e',
  pending: '#eab308',
  rejected: '#ef4444',
  expired: '#6b7280'
};

const StatusDistributionChart: React.FC<StatusDistributionProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value} events`, '']}
            contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem' }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusDistributionChart;