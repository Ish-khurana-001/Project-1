import React from 'react'
import { LuShieldCheck, LuSparkles, LuTrendingUpDown } from 'react-icons/lu';

const AuthLayout = ({children}) => {
  return (
    <div className='flex min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fffdf8_0%,#f7f5ff_52%,#f6f7fb_100%)] dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_52%,#111827_100%)]'>
        <div className='relative z-20 flex w-full min-h-screen items-center justify-center px-3 py-6 md:w-[58vw] md:px-10 md:py-8 lg:px-16'>
            <div className='w-full max-w-xl'>
              <div className='mb-6 flex items-center gap-3 md:mb-8'>
                <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-sky-500 text-white shadow-sm md:h-11 md:w-11'>
                  <LuSparkles className='text-xl' />
                </div>
                <div>
                  <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500'>Finance Workspace</p>
                  <h2 className='font-accent text-lg font-bold text-slate-950 dark:text-white md:text-xl'>Expense Tracker</h2>
                </div>
              </div>

              <div className='card'>
                {children}
              </div>
            </div>
        </div>

        <div className="relative hidden min-h-screen w-[42vw] overflow-hidden bg-slate-950 p-8 md:block">
            <div className='absolute inset-0 bg-[linear-gradient(145deg,_rgba(15,23,42,0.98),_rgba(76,29,149,0.9))]' />
            <div className='absolute left-[-80px] top-[-20px] h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl' />
            <div className='absolute bottom-[-60px] right-[-40px] h-72 w-72 rounded-full bg-sky-400/20 blur-3xl' />

            <div className='relative z-20 mx-auto flex h-full max-w-xl flex-col justify-center gap-12 py-8'>
                <div>
                    <div className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100'>
                        <LuShieldCheck className='text-sm' />
                        Secure Access
                    </div>

                    <h2 className='font-accent mt-8 max-w-lg text-4xl font-bold leading-tight text-white'>
                        Stay on top of every rupee with a calmer, cleaner money workflow.
                    </h2>

                    <p className='mt-5 max-w-xl text-base leading-8 text-slate-300'>
                        Sign in to review your dashboard, capture new transactions, and keep your income and expenses aligned without the clutter.
                    </p>
                </div>

                <div className='space-y-5'>
                    <StatsInfoCard 
                      icon={<LuTrendingUpDown />}
                      label="Track Income & Expenses"
                      value="430,000"
                      color="from-violet-500 via-fuchsia-500 to-sky-500"
                    />

                    <div className='grid grid-cols-2 gap-4'>
                      <div className='rounded-[26px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm'>
                        <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300'>Visibility</p>
                        <p className='mt-3 font-accent text-3xl font-bold text-white'>24/7</p>
                        <p className='mt-2 text-sm leading-6 text-slate-300'>A quick snapshot of balance, inflow, and outflow anytime you log in.</p>
                      </div>
                      <div className='rounded-[26px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm'>
                        <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300'>Clarity</p>
                        <p className='mt-3 font-accent text-3xl font-bold text-white'>Simple</p>
                        <p className='mt-2 text-sm leading-6 text-slate-300'>Designed to help you understand patterns fast, not bury them in noise.</p>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthLayout

const StatsInfoCard = ({icon,label,value,color}) =>{
    return <div className='z-10 flex gap-5 rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm'>
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-[26px] text-white ${color}`}>
            {icon}
        </div>
        <div>
            <h6 className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300'>{label}</h6>
            <span className='font-accent mt-2 block text-[28px] font-bold text-white'>${value}</span>
        </div>
    </div>
}
