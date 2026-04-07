import React, { useContext } from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts"
import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'
import { UserContext } from '../../context/userContext'

const CustomPieChart = ({data, label, totalAmount, colors, showTextAnchor}) => {
  const { theme } = useContext(UserContext);
  const isDark = theme === "dark";

  return (
    <ResponsiveContainer width="100%" height={380}>
        <PieChart>
            <Pie
                data={data}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={122}
                innerRadius={90}
                labelLine={false}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>
            <Tooltip content={CustomTooltip} />
            <Legend content={CustomLegend} />

            {showTextAnchor && (
                <>
                    <text
                        x="50%"
                        y="50%"
                        dy={-25}
                        textAnchor='middle'
                        fill={isDark ? '#94a3b8' : '#64748b'}
                        fontSize="12px"
                        className='font-accent'
                    >
                        {label}
                    </text>

                    <text
                        x="50%"
                        y="50%"
                        dy={8}
                        textAnchor='middle'
                        fill={isDark ? '#f8fafc' : '#0f172a'}
                        fontSize="26px"
                        fontWeight="700"
                        className='font-accent'
                    >
                        {totalAmount}
                    </text>
                </>
            )}
        </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart
