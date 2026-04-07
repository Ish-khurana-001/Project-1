import React from 'react'
import { useContext, useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { LuMoonStar, LuSparkles, LuSunMedium } from 'react-icons/lu';
import SideMenu from './SideMenu';
import { UserContext } from '../../context/userContext';

const NavBar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const { theme, toggleTheme } = useContext(UserContext);
  return (
    <>
      <div className='sticky top-0 z-40 border-b border-white/60 bg-white/85 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-950/85'>
        <div className='mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-3 py-3.5 md:gap-4 md:px-6 md:py-4'>
            <div className='flex items-center gap-3'>
                <button
                    className='inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-colors duration-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 xl:hidden'
                    onClick={() => {
                        setOpenSideMenu(!openSideMenu);
                    }}
                    type='button'
                    aria-label={openSideMenu ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={openSideMenu}
                    aria-controls='mobile-navigation'
                >
                    {openSideMenu ? (
                        <HiOutlineX className='text-2xl'/>
                    ) : (
                        <HiOutlineMenu className='text-2xl' />
                    )}
                </button>

                <div className='flex items-center gap-2.5 md:gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-sky-500 text-white shadow-sm md:h-11 md:w-11'>
                        <LuSparkles className='text-xl' />
                    </div>
                    <div>
                        <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500'>Workspace</p>
                        <h2 className='font-accent text-lg font-bold text-slate-950 dark:text-white md:text-xl'>Expense Tracker</h2>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-3'>
                <button
                    type='button'
                    className='inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-colors duration-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
                    onClick={toggleTheme}
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {theme === 'dark' ? <LuSunMedium className='text-xl' /> : <LuMoonStar className='text-xl' />}
                </button>

                <div className='hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 md:block'>
                    {activeMenu}
                </div>
            </div>
        </div>
      </div>

      {openSideMenu && (
        <div className='fixed inset-0 z-50 xl:hidden'>
            <button
                className='absolute inset-0 bg-slate-950/45'
                onClick={() => setOpenSideMenu(false)}
                type='button'
                aria-label='Close menu'
            />
            <div id='mobile-navigation' className='relative h-full w-[300px] max-w-[88vw] p-3'>
                <SideMenu activeMenu={activeMenu} onItemClick={() => setOpenSideMenu(false)} mobile />
            </div>
        </div>
      )}
    </>
  )
}

export default NavBar
