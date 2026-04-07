import React, { useEffect, useState } from 'react'
import {LuPlus, LuSparkles} from "react-icons/lu"
import CustomBarChart from "../Charts/CustomBarChart"
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({transactions, onAddIncome}) => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
      <div className='card relative overflow-hidden'>
        <div className='absolute inset-x-0 top-0 h-28 bg-[linear-gradient(90deg,_rgba(16,185,129,0.12),_rgba(56,189,248,0.12))] dark:bg-[linear-gradient(90deg,_rgba(16,185,129,0.12),_rgba(6,182,212,0.1))]' />
        <div className='relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
          <div>
            <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200'>
              <LuSparkles className='text-sm' />
              Income Pulse
            </div>
            <h5 className='font-accent text-2xl font-bold text-slate-950 dark:text-white md:text-3xl'>Income Overview</h5>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400'>
              Follow your earning momentum over time and keep each source visible in one bright, readable snapshot.
            </p>
          </div>
          
          <button className='inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 transition-colors duration-200 hover:bg-emerald-100 dark:border-emerald-500/35 dark:bg-emerald-500/12 dark:text-emerald-200 dark:hover:bg-emerald-500/18 md:text-sm' onClick={onAddIncome}>
            <LuPlus className='text-lg' />
            Add Income
          </button>
        </div>

        <div className='mt-8 rounded-[28px] border border-white/80 bg-gradient-to-br from-white via-white to-cyan-50/40 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] dark:border-slate-700/80 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-cyan-950/20 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] md:p-6'>
          <CustomBarChart data={chartData}/>
        </div>

      </div>
  )
}

export default IncomeOverview
