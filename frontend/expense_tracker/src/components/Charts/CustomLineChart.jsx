import React from 'react'
import { XAxis, YAxis, ResponsiveContainer, CartesianGrid, Area, AreaChart, Tooltip } from 'recharts'
import CustomTooltip from './CustomTooltip';

const CustomLineChart = ({data}) => {
  if (!data?.length) {
    return (
      <div className='flex h-[300px] items-center justify-center rounded-[24px] border border-dashed border-slate-200 bg-white/40 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400'>
        Add a few expenses to see your trend line.
      </div>
    );
  }

  return (
    <div className='rounded-[24px] bg-white/30 p-1 dark:bg-slate-950/50'>
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
                <defs>
                    <linearGradient id='expenseGradient' x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor='#d946ef' stopOpacity={0.35} />
                        <stop offset="95%" stopColor='#fb7185' stopOpacity={0.04} />
                    </linearGradient>
                </defs>

                <CartesianGrid stroke='var(--chart-grid)' strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--chart-axis)" }} tickLine={false} axisLine={false} />
                <YAxis width={44} tick={{ fontSize: 12, fill: "var(--chart-axis)" }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />

                <Area type="monotone" dataKey="amount" stroke='#c026d3' fill='url(#expenseGradient)' strokeWidth={3} dot={{ r: 4, fill: "var(--chart-dot-fill)", stroke: "#c026d3", strokeWidth: 2 }} activeDot={{ r: 5, fill: "#c026d3", stroke: "var(--chart-dot-stroke)", strokeWidth: 2 }} />
            </AreaChart>

        </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart
