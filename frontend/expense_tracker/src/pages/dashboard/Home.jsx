import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPath';
import InfoCard from '../../components/Cards/InfoCard';

import { LuHandCoins, LuPlus, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io'
import { addThousandSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions'; 
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if(response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);


  return (
    <DashboardLayout activeMenu = "Dashboard">
      <div className='mx-auto my-4 space-y-5 pb-6 md:my-6 md:space-y-6 md:pb-8'>
        <section className='relative overflow-hidden rounded-[28px] border border-slate-800/10 bg-slate-950 px-4 py-6 text-white shadow-[0_18px_48px_rgba(15,23,42,0.16)] dark:border-slate-700/50 dark:shadow-[0_24px_60px_rgba(2,6,23,0.55)] md:rounded-[32px] md:px-8 md:py-10'>
          <div className='absolute inset-0 bg-[linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(37,99,235,0.88))]' />
          <div className='absolute inset-x-0 top-0 h-28 bg-[linear-gradient(90deg,_rgba(139,92,246,0.16),_rgba(34,211,238,0.14))]' />
          <div className='relative flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between'>
            <div className='max-w-3xl'>
              <p className='mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-200'>Finance Command Center</p>
              <h1 className='font-accent text-[30px] font-bold leading-tight md:text-5xl'>
                Your money flow, organized into one clear daily dashboard.
              </h1>
              <p className='mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base'>
                Review balance, income, expenses, and recent movement in one place so you can understand the big picture without hunting through separate screens.
              </p>
            </div>

            <div className='flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap'>
              <button
                className='w-full rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/20 dark:border dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 sm:w-auto'
                onClick={() => navigate('/income')}
              >
                <span className='inline-flex items-center gap-2'>
                  <LuPlus className='text-lg' />
                  Add Income
                </span>
              </button>
              <button
                className='w-full rounded-full bg-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-fuchsia-600 sm:w-auto'
                onClick={() => navigate('/expense')}
              >
                <span className='inline-flex items-center gap-2'>
                  <LuPlus className='text-lg' />
                  Add Expense
                </span>
              </button>
            </div>
          </div>
        </section>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <InfoCard
            icon = {<IoMdCard />}
            label = "Total Balance"
            value = {addThousandSeparator(dashboardData?.totalBalance || 0)}
            color = "from-violet-500 via-fuchsia-500 to-sky-500"
          />

          <InfoCard
            icon = {<LuWalletMinimal />}
            label = "Total Income"
            value = {addThousandSeparator(dashboardData?.totalIncome || 0)}
            color = "from-emerald-500 via-teal-500 to-cyan-500"
          />

          <InfoCard
            icon = {<LuHandCoins />}
            label = "Total Expense"
            value = {addThousandSeparator(dashboardData?.totalExpense || 0)}
            color = "from-rose-500 via-pink-500 to-orange-500"
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <RecentTransactions 
            transactions = {dashboardData?.recentTransactions}
            onSeeMore = {() => navigate("/expense")}
          />

          <FinanceOverview 
            totalBalance = {dashboardData?.totalBalance || 0}
            totalIncome = {dashboardData?.totalIncome || 0}
            totalExpense = {dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions 
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate('/expense')}
          />

          <Last30DaysExpenses 
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart 
            data = {dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
            totalIncome = {dashboardData?.totalIncome || 0}
          />

          <RecentIncome 
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
          
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home
