import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddExpenseForm = ({onAddExpense}) => {

    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  return (
    <div>
        <div className='mb-5 rounded-[24px] border border-fuchsia-100 bg-gradient-to-br from-fuchsia-50 via-white to-rose-50 px-4 py-4'>
            <p className='font-accent text-lg font-bold text-slate-900'>Log a fresh expense</p>
            <p className='mt-1 text-sm leading-6 text-slate-500'>
                Capture the category, amount, date, and an icon so your dashboard stays organized and visual.
            </p>
        </div>

        <EmojiPickerPopup 
            icon={expense.icon}
            onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />

        <Input
            value={expense.category}
            onChange={({target}) => handleChange("category", target.value)}
            label="Category"
            placeholder="Rent, Groceries, etc"
            type="text"
        />

        <Input 
            value={expense.amount}
            onChange={({target}) => handleChange("amount", target.value )}
            label="Amount"
            placeholder=""
            type="number"
        />

        <Input
            value={expense.date}
            onChange={({target}) => handleChange("date", target.value)}
            label="Date"
            placeholder=""
            type="date"
        />

        <div className='flex justify-end mt-6'>
            <button
                type='button'
                className='add-btn add-btn-fill px-5 py-2.5'
                onClick={() => onAddExpense(expense)}
            >
                Add Expense
            </button>
        </div>

    </div>
  )
}

export default AddExpenseForm
