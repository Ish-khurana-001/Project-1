import React from 'react'
import {
  LuCircleDollarSign,
  LuTrendingDown,
  LuTrendingUp,
  LuTrash2,
  LuWallet,
} from 'react-icons/lu'

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const fallbackIcon =
    type === 'income' ? <LuCircleDollarSign /> : <LuWallet />

  const renderIcon = () => {
    if (React.isValidElement(icon)) {
      return icon
    }

    if (typeof icon === 'string' && icon.trim()) {
      return <img src={icon} alt={title} className='w-6 h-6 object-contain' />
    }

    return fallbackIcon
  }

  return (
    <div className='group relative mt-3 flex items-center gap-3 rounded-[24px] border border-slate-100 bg-white p-4 shadow-sm transition-colors duration-200 hover:border-fuchsia-100 hover:bg-fuchsia-50/30 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-fuchsia-500/20 dark:hover:bg-slate-900 sm:gap-4'>
      <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-100 via-rose-50 to-sky-50 text-xl text-slate-800 dark:from-violet-500/20 dark:via-fuchsia-500/10 dark:to-cyan-500/10 dark:text-slate-100'>
        {renderIcon()}
      </div>

      <div className='min-w-0 flex-1'>
        <p className='truncate text-sm font-semibold text-slate-900 dark:text-white'>{title}</p>
        <p className='mt-1 text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500'>{date}</p>
      </div>

      <div className='ml-auto flex shrink-0 items-center gap-2'>
        {!hideDeleteBtn && (
          <button
            className='cursor-pointer rounded-full border border-transparent p-2 text-slate-400 transition-colors duration-200 hover:border-rose-100 hover:bg-rose-50 hover:text-rose-500 dark:text-slate-500 dark:hover:border-rose-500/20 dark:hover:bg-rose-500/10 dark:hover:text-rose-300'
            onClick={onDelete}
            type='button'
            aria-label={`Delete ${title}`}
          >
            <LuTrash2 size={18} />
          </button>
        )}

        <div
          className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold ${
            type === 'income'
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-rose-50 text-rose-500'
          }`}
        >
          <h6>
            {type === 'income' ? '+' : '-'} ${amount}
          </h6>
          {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>
      </div>
    </div>
  )
}

export default TransactionInfoCard
