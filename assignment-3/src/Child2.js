import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { groupBy, meanBy } from 'lodash';

const Child2 = ({ data }) => {
  const groupedData = groupBy(data, 'day');
  const avgTipsByDay = Object.keys(groupedData).map((day) => ({
    day,
    avg_tip: meanBy(groupedData[day], (d) => parseFloat(d.tip) || 0),
  }));

  return (
    <div>
      <h2>Average Tip by Day</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={avgTipsByDay}
          margin={{ top: 20, right: 30, left: 50, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day">
            <Label 
              value="Day" 
              offset={-30} 
              position="insideBottom" 
              style={{ fontSize: '32px', fontWeight: 'bold', fontFamily: 'Times New Roman', fill: 'black' }} 
            />
          </XAxis>
          <YAxis domain={[0, 3]} ticks={[0, 0.5, 1, 1.5, 2, 2.5, 3]}>
            <Label 
              value="Average Tip" 
              angle={-90} 
              offset={-10}
              position="insideLeft" 
              style={{ fontSize: '32px', fontWeight: 'bold', fontFamily: 'Times New Roman', fill: 'black', textAnchor: 'middle' }} 
            />
          </YAxis>
          <Tooltip />
          <Bar dataKey="avg_tip" fill="#69b3a2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Child2;
