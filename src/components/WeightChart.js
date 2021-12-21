import React from "react";
import { add, format, differenceInCalendarDays, isFuture } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DataUtils from "./DataUtils";
import CustomTooltip from "./CustomTooltip";

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

const DateArea = () => {
  // const startDate = new Date(2019, 0, 1);
  // const endDate = new Date(2020, 0, 15);
  // const data = [
  //   ...DataUtils.days(startDate, 10),
  //   ...DataUtils.days(add(startDate, { months: 2 }), 5),
  //   ...DataUtils.months(add(startDate, { months: 5 }), 1),
  //   ...DataUtils.months(add(startDate, { months: 8 }), 1)
  // ].map(it => ({
  //   date: it.date.getTime(),
  //   val: it.val
  // }));

  const startDate = new Date(2019, 0, 11);
  const endDate = new Date(2019, 9, 15);
  const data = [
    { date: startDate.getTime(), val: 80 },
    { date: new Date(2019, 4, 30).getTime(), val: 70 },
    { date: new Date(2019, 5, 30).getTime(), val: 75 },
    { date: new Date(2019, 6, 21).getTime(), val: 79 },
    { date: new Date(2019, 6, 28).getTime(), val: 84 },
  ];

  const domain = [(dataMin) => dataMin, () => endDate.getTime()];
  const ticks = getTicks(startDate, endDate, 5);
  const filledData = fillTicksData(ticks, data);

  return (
    <div>
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
          <YAxis tickCount={7} hasTick />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="val"
            stroke="#1976d2"
            fill="#1976d2"
            fillOpacity={0.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DateArea;
