import React from 'react'
import { LuDownload } from "react-icons/lu"
import moment from "moment"
import TransactionInfoCard from "../Cards/TransactionInfoCard"

const IncomeList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500'>Sources</p>
          <h5 className='font-accent mt-1 text-2xl font-bold text-slate-950 dark:text-white'>Income sources</h5>
          <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>
            {transactions?.length || 0} earning record{transactions?.length === 1 ? "" : "s"}
          </p>
        </div>

        <button className='card-btn self-start' onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className='mt-6 grid grid-cols-1 gap-2 xl:grid-cols-2'>
        {transactions?.length ? transactions.map((income) => (
          <TransactionInfoCard 
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        )) : (
          <div className='rounded-[24px] border border-dashed border-slate-200 bg-white/50 px-6 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400 xl:col-span-2'>
            No income sources yet. Add one to start tracking how money comes in.
          </div>
        )}
      </div>
    </div>
  )
}

export default IncomeList
