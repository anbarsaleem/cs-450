import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

const Child1 = ({ data }) => {
  const formattedData = data.map(d => ({
    total_bill: parseFloat(d.total_bill) || 0,
    tip: parseFloat(d.tip) || 0,
  }));

  return (
    <div>
      <h2>Total Bill vs Tips</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          width={500}
          height={400}
          margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
        >
          <CartesianGrid />
          <XAxis 
            type="number" 
            dataKey="total_bill" 
            domain={[0, 50]} 
            ticks={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
          >
            <Label 
              value="Total Bill" 
              offset={-30} 
              position="insideBottom" 
              style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'Times New Roman', fill: 'black' }} 
            />
          </XAxis>
          <YAxis 
            type="number" 
            dataKey="tip" 
            domain={[0, 10]} 
            ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          >
            <Label 
              value="Tips" 
              angle={-90} 
              offset={-10}
              position="insideLeft" 
              style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'Times New Roman', fill: 'black', textAnchor: 'middle' }} 
            />
          </YAxis>
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Bills" data={formattedData} fill="#69b3a2" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Child1;
