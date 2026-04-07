import React from 'react'

const CustomLegend = ({payload}) => {
  return (
    <div className='mt-4 flex flex-wrap justify-center gap-3'>
        {payload.map((entry, index) => (
            <div key={`legend-${index}`} className='flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-700 dark:bg-slate-900/80'>
                <div
                className='h-2.5 w-2.5 rounded-full'
                style={{backgroundColor: entry.color}}
                ></div>
                <span className='text-xs font-medium text-slate-700 dark:text-slate-200'>
                    {entry.value}
                </span>
            </div>
        ))}
    </div>
  )
}

export default CustomLegend
