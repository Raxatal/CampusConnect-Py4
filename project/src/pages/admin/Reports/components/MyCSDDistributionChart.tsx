import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface MyCSDDistributionProps {
  data: {
    myCSD: number;
    regular: number;
  };
}

const COLORS = ['#3b82f6', '#6b7280'];

const MyCSDDistributionChart: React.FC<MyCSDDistributionProps> = ({ data }) => {
  const chartData = [
    { name: 'MyCSD Events', value: data.myCSD },
    { name: 'Regular Events', value: data.regular }
  ];

  const total = data.myCSD + data.regular;

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
                fill={COLORS[index]}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [
              `${value} events (${((value / total) * 100).toFixed(1)}%)`,
              ''
            ]}
            contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem' }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyCSDDistributionChart;