import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPath';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';
import moment from 'moment';
import { LuArrowDownToLine, LuCalendar, LuCircleDollarSign, LuPlus } from 'react-icons/lu';

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  //Get All Income Details
  const fetchIncomeDetails = async () => {
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if(response.data){
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  //Handle Add Income
  const handleAddIncome = async (income) => {
      const {source, amount, date, icon} = income;

      //Validation checks
      if(!source.trim()){
        toast.error("Income source is required");
        return;
      }

      if(!amount || isNaN(amount) || Number(amount) <= 0){
        toast.error("Amount should be a valid number greater than 0.")
        return;
      }

      if(!date) {
        toast.error("Date is required.");
        return;
      }

      try{
        await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME , {
          source,
          amount,
          date,
          icon
        });

        setOpenAddIncomeModal(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();
      } catch (error){
        console.error(
          "Error adding income:",
          error.response?.data?.message || error.message
        ); 
      }
  };

  //Delete Income
  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Income details deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error deleting income",
        error.response?.data?.message || error.message
      );
    }
  };

  // Handle download income details
  const handleDownloadIncomeDetails = async () => {
    try{
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME, {
          responseType: "blob",
        }
      );

      //Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details. Please try again.")
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);

  const totalIncome = incomeData.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const latestIncomeDate = incomeData.length ? moment(incomeData[0].date).format("Do MMM YYYY") : "No records yet";
  const uniqueSources = new Set(incomeData.map((item) => item.source).filter(Boolean)).size;

  const statCards = [
    {
      title: "Total Income",
      value: `$${totalIncome.toLocaleString()}`,
      note: "Across all recorded sources",
      icon: LuCircleDollarSign,
      tone: "from-emerald-500 via-teal-500 to-cyan-500",
    },
    {
      title: "Sources Logged",
      value: uniqueSources,
      note: "Distinct ways money comes in",
      icon: LuArrowDownToLine,
      tone: "from-lime-400 via-emerald-400 to-teal-400",
    },
    {
      title: "Last Activity",
      value: latestIncomeDate,
      note: `${incomeData.length} total income entries`,
      icon: LuCalendar,
      tone: "from-sky-400 via-cyan-400 to-teal-400",
    },
  ];

  return (
    <DashboardLayout activeMenu="Income">
      <div className='mx-auto my-4 space-y-5 pb-6 md:my-6 md:space-y-6 md:pb-8'>
        <section className='relative overflow-hidden rounded-[28px] border border-emerald-900/10 bg-slate-950 px-4 py-6 text-white shadow-[0_18px_48px_rgba(15,23,42,0.16)] dark:border-emerald-400/15 dark:shadow-[0_24px_60px_rgba(2,6,23,0.55)] md:rounded-[32px] md:px-8 md:py-10'>
          <div className='absolute inset-0 bg-[linear-gradient(135deg,_rgba(7,89,74,0.98),_rgba(8,47,73,0.92))]' />
          <div className='absolute inset-x-0 top-0 h-28 bg-[linear-gradient(90deg,_rgba(16,185,129,0.18),_rgba(56,189,248,0.12))]' />
          <div className='relative flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between'>
            <div className='max-w-3xl'>
              <p className='mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-200'>Income Command Center</p>
              <h1 className='font-accent text-[30px] font-bold leading-tight md:text-5xl'>
                Make your earnings feel as visible as your expenses.
              </h1>
              <p className='mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base'>
                Track every source, follow monthly momentum, and keep your income history clear enough to spot patterns quickly.
              </p>
            </div>

            <button
              className='w-full rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-400 sm:w-auto'
              onClick={() => setOpenAddIncomeModal(true)}
            >
              <span className='inline-flex items-center gap-2'>
                <LuPlus className='text-lg' />
                Add Income
              </span>
            </button>
          </div>
        </section>

        <section className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {statCards.map((card) => (
            <div key={card.title} className='card relative overflow-hidden'>
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.tone}`} />
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500'>{card.title}</p>
                  <h3 className='font-accent mt-3 text-2xl font-bold text-slate-950 dark:text-white md:text-3xl'>{card.value}</h3>
                  <p className='mt-2 text-sm text-slate-500 dark:text-slate-400'>{card.note}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${card.tone}`}>
                  <card.icon className='text-xl' />
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className='grid grid-cols-1 gap-6'>
          <IncomeOverview 
            transactions = {incomeData}
            onAddIncome = {() => setOpenAddIncomeModal(true)}
          />

          <IncomeList 
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />

        </div>

        <Modal
          isOpen = {openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <div>
            <AddIncomeForm onAddIncome={handleAddIncome} />
          </div>
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
            <DeleteAlert 
              content="Are you sure you want to delete this income entry?"
              onDelete={() => deleteIncome(openDeleteAlert.data)}
            />

        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
