import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({data}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);

        return () => {};
    }, [data]);

  return (
    <div className='card col-span-1 relative overflow-hidden'>
        <div className='absolute inset-x-0 top-0 h-24 bg-[linear-gradient(90deg,_rgba(244,114,182,0.08),_rgba(251,113,133,0.10))] dark:bg-[linear-gradient(90deg,_rgba(217,70,239,0.08),_rgba(244,63,94,0.08))]' />
        <div className='flex items-center justify-between'>
            <div>
                <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500'>Trend</p>
                <h5 className='font-accent mt-1 text-2xl font-bold text-slate-950 dark:text-white'>Last 30 Days Expenses</h5>
            </div>
        </div>

        <CustomBarChart data={chartData} />
    </div>
  )
}

export default Last30DaysExpenses
