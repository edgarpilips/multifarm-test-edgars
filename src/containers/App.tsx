import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import CustomTooltip from '../components/CustomTooltip';
import { API_URL } from '../constants';
import {
  formatAprValue,
  formatTvlValue,
  formatXAxisDate,
} from '../helpers';

function App() {
  const [tvlData, setTvlData] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        let data = response.data?.data?.[0]?.selected_farm?.[0]?.tvlStakedHistory || [];
        data = data.reverse()
          .map(({ date, value }: { date: string, value: number }) => ({
            date: date.replace(/\./g, '-'),
            value,
          }));
        setTvlData(data);
      });
  }, []);

  const aprData = useMemo(() => {
    let value = 0;
    return tvlData.map(({ date }) => {
      value += 5;
      return { date, value };
    });
  }, [tvlData]);

  return (
    <div className="grid grid-cols-2 gap-[1.25rem] text-sm">
      <div className="h-[300px]">
        <p className="my-5 text-white text-center font-bold text-base">Asset APR (y)</p>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={aprData}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DC4DFF" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#4DBFFF" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#6B6BB2" strokeOpacity="0.4" />
            <XAxis dataKey="date" tick={{ fill: '#B2BDFF' }} tickLine={false} tickFormatter={formatXAxisDate} />
            <YAxis tick={{ fill: '#B2BDFF' }} tickCount={5} tickLine={false} tickFormatter={formatAprValue} />
            <Tooltip content={<CustomTooltip />} formatter={formatAprValue} />
            <Area type="monotone" dataKey="value" stroke="#D750FF" strokeWidth={2} fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="h-[300px]">
        <p className="my-5 text-white text-center font-bold text-base">Asset TVL</p>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={tvlData}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DC4DFF" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#4DBFFF" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#6B6BB2" strokeOpacity="0.4" />
            <XAxis dataKey="date" tick={{ fill: '#B2BDFF' }} tickLine={false} tickFormatter={formatXAxisDate} />
            <YAxis tick={{ fill: '#B2BDFF' }} tickCount={5} tickLine={false} tickFormatter={formatTvlValue} />
            <Tooltip content={<CustomTooltip />} formatter={formatTvlValue} />
            <Area type="monotone" dataKey="value" stroke="#D750FF" strokeWidth={2} fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
