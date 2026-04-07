import React from 'react'

const CustomTooltip = ({active, payload}) => {
  if(active && payload && payload.length) {
    const item = payload[0].payload;
    const title = item.category || item.month || item.name || "Item";
    return (
    <div className='rounded-2xl border border-white/10 bg-slate-950 px-3 py-2.5 text-white shadow-2xl shadow-slate-900/20 dark:border-slate-700'>
        <p className='mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-fuchsia-200'>
            {title}
        </p>
        <p className='text-sm text-slate-200'>
            Amount:{" "}
            <span className='font-semibold text-white'>
                ${payload[0].value}
            </span>
        </p>
    </div>
  )
  }
  return null;
}

export default CustomTooltip
