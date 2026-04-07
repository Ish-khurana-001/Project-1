import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: ""
    });

    const handleChange = (key,value) => setIncome({...income, [key]: value});
  return (
    <div>
        <div className='mb-5 rounded-[24px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 px-4 py-4'>
            <p className='font-accent text-lg font-bold text-slate-900'>Add a new income source</p>
            <p className='mt-1 text-sm leading-6 text-slate-500'>
                Save the source, amount, date, and icon so your earnings stay organized and easy to compare.
            </p>
        </div>

        <EmojiPickerPopup 
            icon={income.icon}
            onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />

        <Input
            value={income.source}
            onChange={({target}) => handleChange("source",target.value)}
            label="Income Source"
            placeholder="Freelance, Salary, etc"
            type="text"
        />

        <Input 
            value={income.amount}
            onChange={({target}) => handleChange("amount", target.value)}
            label="Amount"
            placeholder=""
            type="number"
        />

        <Input 
            value={income.date}
            onChange={({target}) => handleChange("date", target.value)}
            label="Date"
            placeholder=""
            type="date"
        />

        <div className='flex justify-end mt-6'>
            <button
                type='button'
                className='rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-700'
                onClick={() => onAddIncome(income)} 
            >
                Add Income
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm
