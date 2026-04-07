import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts"

const CustomBarChart = ({data}) => {
    const getLabel = (entry) => {
        if (!entry) return "";
        return entry.category || entry.month || entry.source || entry.name || "";
    };

    //Function to alternate colors
    const getBarColor = (index) => {
        return index % 2 === 0 ? "#0f766e" : "#7dd3fc";
    }

    const CustomTooltip = ({ active, payload }) => {
        if(active && payload && payload.length){
            return (
                <div className='rounded-2xl border border-white/10 bg-slate-950 px-3 py-2.5 text-white shadow-xl shadow-slate-900/20 dark:border-slate-700'>
                    <p className='mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200'>
                        {getLabel(payload[0].payload)}
                    </p>

                    <p className='text-sm text-slate-200'>
                        Amount: <span className='font-semibold text-white'>${payload[0].payload.amount}</span>
                    </p>
                </div>
            )
        }

        return null;
    }

  return (
    <div className='mt-6 rounded-[24px] bg-white/30 p-1 dark:bg-slate-950/50'>
          {!data?.length ? (
            <div className='flex h-[300px] items-center justify-center rounded-[24px] border border-dashed border-slate-200 bg-white/40 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400'>
              Add a few income entries to reveal your earning trend.
            </div>
          ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -4, bottom: 5 }}>
                <CartesianGrid stroke='var(--chart-grid)' strokeDasharray="4 4" vertical={false} />

                <XAxis dataKey={getLabel} tick={{ fontSize: 12, fill: "var(--chart-axis)" }} tickLine={false} axisLine={false} />
                <YAxis width={42} tick={{ fontSize: 12, fill: "var(--chart-axis)"}} tickLine={false} axisLine={false} />

                <Tooltip content={CustomTooltip} />

                <Bar
                    dataKey="amount"
                    fill='#0f766e'
                    radius={[10, 10, 0, 0]}
                    barSize={36}
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={getBarColor(index)} />
                    ))}
                </Bar>
            </BarChart>
          </ResponsiveContainer>
          )}
    </div>
  ) 
}

export default CustomBarChart
