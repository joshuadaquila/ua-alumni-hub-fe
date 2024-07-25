import React, { useState } from 'react';
import ualogo from "../resources/ualogo.jpg";
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreen';

function Signup() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [graduationyear, setGradyear] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errors, setErrors] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const register = async (event) => {
    event.preventDefault();
    setLoading(true);
    const errors = validatePassword(password, confirmPassword);
    if (errors.length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/signup', {
        name,
        address,
        birthday,
        graduationyear,
        email,
        password
      }, { withCredentials: true });
    
      console.log(name, address, birthday, graduationyear, email, password);
      // setLoading(false);

    } catch (error) {
      setErrors([...errors, error.response?.status || "Unknown error"]);
      setLoading(false);
    }
  };

  const validatePassword = (password, confirmPassword) => {
    const errors = [];
    if (password !== confirmPassword) {
      errors.push("Passwords do not match");
    }
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }
    return errors;
  };

  return (
    <div className='grid signupCon grid-cols-2 background place-items-center min-h-screen w-full'>
      <div className='signupFCol hidden flex-col items-center justify-center'>
        <img src={ualogo} className='rounded-full' width={300} />
        <div className='flex flex-col items-start'>
          <p className='text-5xl font-bold ml-4 mt-6 text-slate-800'>Be a part of the community,</p>
          <p className='text-5xl font-bold ml-4 text-slate-800'>KASUBAY!</p>
        </div>
        
      </div>
      <div className='formW flex flex-col justify-center items-center bg-slate-400 
       rounded-xl bg-opacity-50 p-6 m-6 w-[70%]'>
        <h1 className='text-xl font-bold'>Sign Up</h1>
        <div className="p-8 flex flex-col items-center">

          <form onSubmit={register} className='flex flex-col ' >
            <div className='flex flex-col items-start'>
              <label className='text-lg ml-2'>Name</label>
              <input className="text-xl p-2  w-80 formBlank border-b-2 bg-transparent placeholder-gray-500
                outline-none border-gray-900" placeholder="Juan Dela Cruz" type="text" 
                value={name} onChange={(event) => {setName(event.target.value)}} required/>
            </div>

            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Address</label>
              <input className="text-xl p-2  w-80 formBlank border-b-2 bg-transparent placeholder-gray-500
                outline-none border-gray-900" placeholder="District II, Sibalom, Antique" type="text" 
                value={address} onChange={(event) => {setAddress(event.target.value)}} required/>
            </div>

            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Birthday</label>
              <input className="text-xl p-2  w-80 formBlank border-b-2 bg-transparent placeholder-gray-500
                outline-none border-gray-900" placeholder="Juan Dela Cruz" type="date" 
                value={birthday} onChange={(event) => {setBirthday(event.target.value)}} required/>
            </div>

            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Year Graduated</label>
              <input className="text-xl p-2  w-80 formBlank border-b-2 bg-transparent placeholder-gray-500
                outline-none border-gray-900" placeholder="2024" min="1900" type="number" 
                value={graduationyear} onChange={(event) => {setGradyear(event.target.value)}} required/>
            </div>

            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Email</label>
              <input className="text-xl p-2  w-80 formBlank border-b-2 bg-transparent placeholder-gray-500
                outline-none border-gray-900" placeholder="juandelacruz@gmail.com" type="email" 
                value={email} onChange={(event) => {setEmail(event.target.value)}} required />
            </div>

            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Password</label>
              <input className="text-xl p-2  w-80 formBlank border-b-2 bg-transparent placeholder-gray-500
                outline-none border-gray-900" type="password" 
                value={password} onChange={(event) => {setPassword(event.target.value)}} required />
            </div>

            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Confirm Password</label>
              <input className="text-xl p-2  w-80 formBlank border-b-2 bg-transparent placeholder-gray-500
                outline-none border-gray-900" type="password" 
                value={confirmPassword} onChange={(event) => {setConfirmPassword(event.target.value) ; setErrors([])}} required />
            </div>

            {errors.length > 0 && (
              <div className='text-red-500 p-2'>
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            <div className='flex flex-col items-center justify-center'>
              <button className={`mt-4 ${isLoading? "": "btn"} font-bold rounded-lg text-lg  w-48 h-16 bg-[#374151] text-[#ffffff] justify-center
                outline-none cursor-pointer`} type="submit" name='' disabled={isLoading}>{isLoading? <LoadingScreen/> : "Log in"}</button>
            </div>
          </form>

          <Link to="/" className='mt-4'><span className='underline italic selection:text-blue-950 btn'>I have an account already.</span></Link>
        </div>
      </div>
    </div>
  )
}

export default Signup;