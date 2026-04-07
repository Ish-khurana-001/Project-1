import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPath';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';


const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();  

    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }

    if (!password){
      setError("Please enter the password");
      return;
    }

    setError(""); 

    //login API call
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if(token) {
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <AuthLayout>
      <div className='relative z-30 pointer-events-auto flex flex-col justify-center'>
        <div className='mb-8'>
          <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500'>Welcome Back</p>
          <h3 className='font-accent mt-3 text-3xl font-bold text-slate-950 dark:text-white'>Sign in to your account</h3>
          <p className='mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400'>
            Enter your email and password to continue into your finance workspace.
          </p>
        </div>

        <form onSubmit={handleLogin} className='space-y-1'>
          <div className='rounded-[24px] border border-fuchsia-100 bg-gradient-to-br from-fuchsia-50 via-white to-sky-50 px-4 py-4 dark:border-fuchsia-500/20 dark:from-fuchsia-500/10 dark:via-slate-900 dark:to-cyan-500/10'>
            <p className='text-sm font-semibold text-slate-800 dark:text-slate-100'>Quick access</p>
            <p className='mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400'>
              Review your dashboard, update transactions, and stay on top of your money flow.
            </p>
          </div>

          <div className='pt-2'>
            <Input
              value = {email}
              onChange = {({target}) => setEmail(target.value)}
              label="Email Address"
              placeholder = "abc@example.com"
              type = "text"
            />

            <Input
              value = {password}
              onChange = {({target}) => setPassword(target.value)}
              label="Password"
              placeholder = "Min 8 Characters"
              type = "password"
            />
          </div>

          {error && <p className='pb-2.5 text-xs text-rose-500 dark:text-rose-300'>{error}</p>}

          <button type='submit' className='btn-primary !mt-3'>
            LOGIN
          </button>

          <p className='mt-4 text-[13px] text-slate-600 dark:text-slate-400'>
            Don't have an account? {" "}
            <Link className="font-semibold text-primary underline underline-offset-4" to="/signup">
             Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
