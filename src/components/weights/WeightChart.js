import React from "react";
import { add, format, differenceInCalendarDays, isFuture } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import DataUtils from "../DataUtils";
import CustomTooltip from "../CustomTooltip";

const dateFormatter = (date) => {
  return format(new Date(date), "dd/MMM");
};

/**
 * get the dates between `startDate` and `endSate` with equal granularity
 */
const getTicks = (startDate, endDate, num) => {
  const diffDays = differenceInCalendarDays(endDate, startDate);

  let current = startDate,
    velocity = Math.round(diffDays / (num - 1));

  const ticks = [startDate.getTime()];

  for (let i = 1; i < num - 1; i++) {
    ticks.push(add(current, { days: i * velocity }).getTime());
  }

  ticks.push(endDate.getTime());
  return ticks;
};

const createDate = (date, val) => {
  return { date, val };
};

/**
 * Add data of the date in ticks,
 * if there is no data in that date in `data`.
 *
 * @param Array<number> _ticks
 * @param {*} data
 */
const fillTicksData = (_ticks, data) => {
  const ticks = [..._ticks];
  const filled = [];
  let currentTick = ticks.shift();
  let lastData = null;
  for (const it of data) {
    if (ticks.length && it.date > currentTick && lastData) {
      filled.push({ ...lastData, ...{ date: currentTick } });
      currentTick = ticks.shift();
    } else if (ticks.length && it.date === currentTick) {
      currentTick = ticks.shift();
    }

    filled.push(it);
    lastData = it;
  }

  return filled;
};

export default function WeightChart(props) {
  console.log(props);
  const data = [];
  props.map((d) => data.push(createDate(new Date(d.date).getTime(), d.weight)));

  const startDate = new Date(2021, 11, 200);
  const endDate = new Date(2021, 11, 31);

  const domain = [(dataMin) => dataMin, () => endDate.getTime()];
  const ydomain = [(dataMin) => dataMin - 5, 100];
  const ticks = getTicks(startDate, endDate, 5);
  const filledData = fillTicksData(ticks, data);

  return (
    <React.Fragment>
      <ResponsiveContainer width="90%" height={200}>
        <AreaChart
          width={900}
          height={250}
          data={filledData}
          margin={{
            top: 10,
            right: 0,
            bottom: 10,
            left: 0,
          }}
        >
          <XAxis
            dataKey="date"
            hasTick
            scale="time"
            tickFormatter={dateFormatter}
            type="number"
            domain={domain}
            ticks={ticks}
          />
          <YAxis tickCount={5} hasTick domain={ydomain} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="linear"
            dataKey="val"
            stroke="#1976d2"
            fill="#1976d2"
            fillOpacity={0.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
