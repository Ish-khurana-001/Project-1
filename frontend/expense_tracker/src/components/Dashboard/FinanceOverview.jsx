import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#8b5cf6", "#fb7185", "#14b8a6"];

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {

    const balanceData = [
        {name: "Total Balance", amount: totalBalance},
        {name: "Total Expenses", amount: totalExpense},
        {name: "Total Income", amount: totalIncome},
    ]

  return (
    <div className='card relative overflow-hidden'>
        <div className='absolute inset-x-0 top-0 h-24 bg-[linear-gradient(90deg,_rgba(139,92,246,0.10),_rgba(20,184,166,0.10))]' />
        <div className='flex items-center justify-between'>
            <div>
                <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500'>Snapshot</p>
                <h5 className='font-accent mt-1 text-2xl font-bold text-slate-950 dark:text-white'>Financial Overview</h5>
            </div>
        </div>

        <CustomPieChart 
            data = {balanceData}
            label = "Total Balance"
            totalAmount = {`$${totalBalance}`}
            colors = {COLORS}
            showTextAnchor
        />
    </div>
  )
}

export default FinanceOverview
