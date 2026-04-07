import React from 'react'
import {LuArrowRight} from "react-icons/lu"
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const RecentTransactions = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div>
                <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500'>Activity</p>
                <h5 className='font-accent mt-1 text-2xl font-bold text-slate-950 dark:text-white'>Recent Transactions</h5>
            </div>

            <button className='card-btn' onClick={onSeeMore}>
                See All 
                <LuArrowRight className="text-base"/>
            </button>
        </div>

        <div className='mt-6'>
            {transactions?.slice(0,5)?.map((item) => (
                <TransactionInfoCard
                    key = {item._id}
                    title = {item.type === 'expense' ? item.category : item.source}
                    icon = {item.icon}
                    date = {moment(item.date).format("Do MMM YYYY")}
                    amount = {item.amount}
                    type = {item.type}
                    hideDeleteBtn
                />
            ))}

            {!transactions?.length && (
                <p className='rounded-[24px] border border-dashed border-slate-200 bg-white/50 py-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400'>No recent transactions yet.</p>
            )}
        </div>
    </div>
  )
}

export default RecentTransactions
