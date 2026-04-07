import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import NavBar from './NavBar'
import SideMenu from './SideMenu'

const DashboardLayout = ({children,activeMenu}) => {
    const {user} = useContext(UserContext);
  return (
    <div className='min-h-screen'>
        <NavBar activeMenu = {activeMenu}/>

        {user && (
            <div className='mx-auto flex max-w-[1600px] gap-4 px-3 pb-5 md:gap-6 md:px-6 md:pb-6'>
                <div className='hidden xl:block'>
                    <SideMenu activeMenu={activeMenu}/>
                </div>

                <div className='min-w-0 grow'>{children}</div>
            </div>
        )}
    </div>
  )
}

export default DashboardLayout
