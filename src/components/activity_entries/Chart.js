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

const getDomain = (props, maxVal) => {
  if (props.length !== 0) {
    var quotient = Math.floor(maxVal / 1000);
    return (quotient + 1) * 1000;
  } else {
    return 0;
  }
};

const ChartComponent = (props) => {
  const maxVal = Math.max.apply(
    Math,
    props.map(function (obj) {
      return obj.calories;
    })
  );
  console.log(maxVal);
  console.log(getDomain(props, maxVal));

  return (
    <ResponsiveContainer width="95%" height={300}>
      <BarChart data={props}>
        <XAxis dataKey="day" />
        <YAxis type="number" domain={[0, getDomain(props, maxVal)]} />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="calories" fill="#1976d2" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
