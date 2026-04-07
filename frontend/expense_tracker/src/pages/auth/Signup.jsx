import React, { useState } from 'react'
// import axios from 'axios';
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosinstance';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';


const Signup = () => {
  
  const [profilePic,setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error , setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  // Handle sign up form submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if(!fullName){
      setError("Please enter your name");
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("");

    //Sign up API call
    try {

      // Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      }); 

      const { token, user } = response.data;

      if(token) {
        localStorage.setItem("token", token);
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
  };

  return (
    <AuthLayout>
      <div className='relative z-30 pointer-events-auto flex flex-col justify-center'>
        <div className='mb-8'>
          <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500'>Create Account</p>
          <h3 className='font-accent mt-3 text-3xl font-bold text-slate-950 dark:text-white'>Set up your finance workspace</h3>
          <p className='mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400'>
            Add your details below and start tracking income, expenses, and balance in one place.
          </p>
        </div>

        <form onSubmit={handleSignUp} className='space-y-1'>
          <div className='rounded-[24px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-4 py-4 dark:border-emerald-500/20 dark:from-emerald-500/10 dark:via-slate-900 dark:to-cyan-500/10'>
            <p className='text-sm font-semibold text-slate-800 dark:text-slate-100'>Getting started</p>
            <p className='mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400'>
              Choose a profile photo if you want, then add your name, email, and password to create your account.
            </p>
          </div>

          <ProfilePhotoSelector image={profilePic} setImage = {setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input 
              value={fullName}
              onChange={({target}) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />

            <Input
            value = {email}
            onChange = {({target}) => setEmail(target.value)}
            label="Email Address"
            placeholder = "abc@example.com"
            type = "text"
          />

          <div className='col-span-2'>
          <Input
            value = {password}
            onChange = {({target}) => setPassword(target.value)}
            label="Password"
            placeholder = "Min 8 Characters"
            type = "password"
          />
          </div>
          </div>

          {error && <p className='pb-2.5 text-xs text-rose-500 dark:text-rose-300'>{error}</p>}
          
          <button type='submit' className='btn-primary !mt-3'>
            SIGN UP
          </button>
          
          <p className='mt-4 text-[13px] text-slate-600 dark:text-slate-400'>
            Already have an account? {" "}
             <Link className="font-semibold text-primary underline underline-offset-4" to="/login">
                Login
              </Link>
          </p>
        </form> 
      </div>
    </AuthLayout>
  )
}

export default Signup;
