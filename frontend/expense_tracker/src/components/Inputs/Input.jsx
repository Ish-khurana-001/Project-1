import React, { useId, useState } from 'react'
import { FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

const Input = ({value, onChange, placeholder, label, type}) => {

    const [showPassword,setShowPassword] = useState(false);
    const inputId = useId();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

  return (
    <div>
        <label htmlFor={inputId} className='text-[13px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400'>{label}</label>

        <div className='input-box'>
            <input 
                id={inputId}
                type={type === 'password' ? showPassword ? 'text' : 'password' : type}
                placeholder={placeholder}
                className='w-full bg-transparent outline-none placeholder:text-slate-300 dark:placeholder:text-slate-500'
                value={value}
                onChange={(e) => onChange(e)}
            />

            {type === "password" && (
                <>
                <button
                    type='button'
                    className='cursor-pointer text-slate-400 transition-colors duration-200 hover:text-primary'
                    onClick={() => toggleShowPassword()}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                >
                {showPassword ? (
                    <FaRegEye
                    size={22}
                    className='text-primary'
                    />
                ) : (
                    <FaRegEyeSlash
                    size={22}
                    className='text-slate-400'
                    />
                )}
                </button>
                </>
            )}

        </div>
    </div>
  )
}

export default Input
