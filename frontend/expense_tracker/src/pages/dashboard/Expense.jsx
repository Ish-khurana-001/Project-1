import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosinstance';
import toast from 'react-hot-toast';
import moment from 'moment';
import { LuCalendar, LuPlus, LuTrendingDown, LuWallet } from 'react-icons/lu';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  //Get All Expense Details
  const fetchExpenseDetails = async () => {
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if(response.data){
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  //Handle Add Expense
  const handleAddExpense = async (expense) => {
      const {category, amount, date, icon} = expense;

      //Validation checks
      if(!category.trim()){
        toast.error("Category is required");
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
        await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE , {
          category,
          amount,
          date,
          icon
        });

        setOpenAddExpenseModal(false);
        toast.success("Expense added successfully");
        fetchExpenseDetails();
      } catch (error){
        console.error(
          "Error adding expense:",
          error.response?.data?.message || error.message
        ); 
      }
  };

    //Delete Expense
  const deleteExpense = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting expense",
        error.response?.data?.message || error.message
      );
    }
  };

  //Handle download expense details
  const handleDownloadExpenseDetails = async () => {
    try{
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
          responseType: "blob",
        }
      );

      //Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details. Please try again.")
    }
  }; 

  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);

  const totalExpenses = expenseData.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const latestExpenseDate = expenseData.length ? moment(expenseData[0].date).format("Do MMM YYYY") : "No records yet";
  const uniqueCategories = new Set(expenseData.map((item) => item.category).filter(Boolean)).size;

  const statCards = [
    {
      title: "Total Spent",
      value: `$${totalExpenses.toLocaleString()}`,
      note: "Across all logged expenses",
      icon: LuWallet,
      tone: "from-rose-500 via-fuchsia-500 to-violet-500",
    },
    {
      title: "Transactions",
      value: expenseData.length,
      note: "Captured in your ledger",
      icon: LuTrendingDown,
      tone: "from-amber-400 via-orange-400 to-rose-400",
    },
    {
      title: "Last Activity",
      value: latestExpenseDate,
      note: `${uniqueCategories} categories in rotation`,
      icon: LuCalendar,
      tone: "from-sky-400 via-cyan-400 to-teal-400",
    },
  ];

  return (
    <DashboardLayout activeMenu="Expense">
      <div className='mx-auto my-4 space-y-5 pb-6 md:my-6 md:space-y-6 md:pb-8'>
        <section className='relative overflow-hidden rounded-[28px] border border-slate-800/10 bg-slate-950 px-4 py-6 text-white shadow-[0_18px_48px_rgba(15,23,42,0.16)] dark:border-slate-700/50 dark:shadow-[0_24px_60px_rgba(2,6,23,0.55)] md:rounded-[32px] md:px-8 md:py-10'>
          <div className='absolute inset-0 bg-[linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(76,29,149,0.88))]' />
          <div className='absolute inset-x-0 top-0 h-28 bg-[linear-gradient(90deg,_rgba(244,114,182,0.16),_rgba(56,189,248,0.12))]' />
          <div className='relative flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between'>
            <div className='max-w-3xl'>
              <p className='mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-fuchsia-200'>Expense Command Center</p>
              <h1 className='font-accent text-[30px] font-bold leading-tight md:text-5xl'>
                Keep spending visible before it starts to feel messy.
              </h1>
              <p className='mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base'>
                This page gives your expense activity a cleaner rhythm: fast capture, clearer trend lines, and a ledger that is easier to scan at a glance.
              </p>
            </div>

            <button
              className='add-btn add-btn-fill w-full self-start px-5 py-2.5 sm:w-auto'
              onClick={() => setOpenAddExpenseModal(true)}
            >
              <LuPlus className='text-lg' />
              Add Expense
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
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${card.tone}`}>
                  <card.icon className='text-xl' />
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className='grid grid-cols-1 gap-6'>
          <ExpenseOverview 
            transactions={expenseData}
            onExpenseIncome={() => setOpenAddExpenseModal(true)}
          />

          <ExpenseList 
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id })
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal 
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert 
              content="Are you sure you want to delete this expense entry?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />

        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
