import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";




const ChartComponent = (props) => {
  return (
    <ResponsiveContainer width="95%" height={300}>
      <BarChart data={props}>
        <XAxis dataKey="day" />
        <YAxis type="number" domain={[0, "dataMax+1000"]} />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="calories" fill="#1976d2" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
