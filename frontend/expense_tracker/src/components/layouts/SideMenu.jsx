import React from 'react'
import {SIDE_MENU_DATA} from '../../utils/data'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from "react-router-dom";
import { LuChevronRight } from 'react-icons/lu';
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({activeMenu, onItemClick, mobile = false}) => {
    const { user, clearUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleClick = (route) => {
        if(route === "logout"){
            handleLogout();
            return;
        }

        navigate(route);
        onItemClick?.();
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
        onItemClick?.();
    };

  return (
    <div className={`${mobile ? 'h-full w-full overflow-y-auto' : 'sticky top-[88px] h-[calc(100vh-112px)] w-[290px]'} rounded-[28px] border border-white/70 bg-white p-4 shadow-[0_18px_48px_rgba(15,23,42,0.08)] dark:border-slate-800/80 dark:bg-slate-950/92 dark:shadow-[0_18px_48px_rgba(2,6,23,0.5)] md:rounded-[30px] md:p-5`}>
        <div className='mb-6 rounded-[24px] bg-gradient-to-br from-violet-50 via-white to-sky-50 px-4 py-4 dark:from-violet-500/10 dark:via-slate-900 dark:to-cyan-500/10 md:mb-7 md:rounded-[26px] md:py-5'>
            <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500'>Profile</p>
            <div className='mt-4 flex items-center gap-4'>
            {user?.profileImageUrl ? (
                <img  
                    src={user?.profileImageUrl || ""}
                    alt='Profile Image'
                    className='h-16 w-16 rounded-2xl bg-slate-400 object-cover'
                />) : (
                <CharAvatar 
                    fullName = {user?.fullName}
                    width = "w-16"
                    height = "h-16"
                    style = "text-lg rounded-2xl"
                />
                )}

                <div className='min-w-0'>
                    <h5 className='truncate font-accent text-lg font-bold text-slate-950 dark:text-white md:text-xl'>
                        {user?.fullName || ""}
                    </h5>
                    <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>
                        Keep your balance, income, and spending in sync.
                    </p>
                </div>
            </div>
        </div>

        <div className='mb-3 px-2'>
            <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500'>Navigation</p>
        </div>

        <nav className='space-y-2' aria-label='Sidebar navigation'>
        {SIDE_MENU_DATA.map((item, index) => (
            <button
                key={`menu_${index}`}
                className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left text-[15px] font-medium transition-colors duration-200 ${
                    activeMenu === item.label
                    ? "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500 text-white shadow-sm"
                    : item.label === "Logout"
                    ? "text-rose-500 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"
                    : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
                }`}
                onClick={() => handleClick(item.path)}
                type='button'
                aria-current={activeMenu === item.label ? 'page' : undefined}
            >
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    activeMenu === item.label
                    ? "bg-white/15 text-white"
                    : item.label === "Logout"
                    ? "bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-300"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}>
                    <item.icon className="text-xl" />
                </span>
                <span className='flex-1'>{item.label}</span>
                {item.label !== "Logout" && (
                    <LuChevronRight className={`${activeMenu === item.label ? 'text-white/80' : 'text-slate-300 dark:text-slate-600'}`} />
                )}
            </button>
        ))}
        </nav>

        <div className='mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900 md:mt-6'>
            <p className='text-sm font-semibold text-slate-800 dark:text-slate-100'>Quick note</p>
            <p className='mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400'>
                Update income and expense pages regularly to keep this dashboard accurate.
            </p>
        </div>
    </div>
  )
}

export default SideMenu
