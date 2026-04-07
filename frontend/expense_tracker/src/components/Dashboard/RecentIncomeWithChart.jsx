import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ["#14b8a6", "#7dd3fc", "#8b5cf6", "#f97316"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }));

        setChartData(dataArr);
    };

    useEffect(() => {
        prepareChartData();

        return () => {};
    }, [data]);

  return (
    <div className='card relative overflow-hidden'>
        <div className='absolute inset-x-0 top-0 h-24 bg-[linear-gradient(90deg,_rgba(20,184,166,0.10),_rgba(125,211,252,0.12))] dark:bg-[linear-gradient(90deg,_rgba(20,184,166,0.10),_rgba(59,130,246,0.1))]' />
        <div className='flex items-center justify-between'>
            <div>
                <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500'>Distribution</p>
                <h5 className='font-accent mt-1 text-2xl font-bold text-slate-950 dark:text-white'>Last 60 Days Income</h5>
            </div>
        </div>

        <CustomPieChart 
            data={chartData}
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            showTextAnchor
            colors={COLORS}
        />
    </div>
  )
}

export default RecentIncomeWithChart
