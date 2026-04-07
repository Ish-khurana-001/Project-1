import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
  return (
    <div className='card relative overflow-hidden'>
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${color}`}></div>
        <div className='flex items-center gap-5'>
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-[26px] text-white ${color}`}>
            {icon}
        </div>
        <div>
            <h6 className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500'>{label}</h6>
            <span className='font-accent mt-2 block text-[28px] font-bold text-slate-950 dark:text-white'>${value}</span>
        </div>
        </div>
    </div>
  )
}

export default InfoCard
