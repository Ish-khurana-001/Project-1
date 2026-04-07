import React, { useEffect, useState } from 'react'
import { LuPlus, LuSparkles } from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({transactions, onExpenseIncome}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);

        return () => {};
    }, [transactions]);

  return (
    <div className='card relative overflow-hidden'>
        <div className='absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.24),_transparent_52%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.2),_transparent_40%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(217,70,239,0.18),_transparent_52%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.14),_transparent_40%)]' />
        <div className='relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
            <div>
                <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-100 bg-fuchsia-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-700 dark:border-fuchsia-500/30 dark:bg-fuchsia-500/10 dark:text-fuchsia-200'>
                    <LuSparkles className='text-sm' />
                    Expense Story
                </div>
                <h5 className='font-accent text-2xl font-bold text-slate-950 dark:text-white md:text-3xl'>Expense Overview</h5>
                <p className='mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400'>
                    Track your spending rhythm, spot busy weeks faster, and keep every category visible in one calm, readable view.
                </p>
            </div>

            <button className='add-btn self-start shadow-sm shadow-fuchsia-100 dark:shadow-fuchsia-900/20' onClick={onExpenseIncome}>
                <LuPlus className='text-lg' />
                Add Expense
            </button>
        </div>

        <div className='mt-8 rounded-[28px] border border-white/80 bg-gradient-to-br from-white via-white to-rose-50/50 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] dark:border-slate-700/80 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-fuchsia-950/20 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] md:p-6'>
            <CustomLineChart data={chartData} />
        </div>
    </div>
  )
}

export default ExpenseOverview
