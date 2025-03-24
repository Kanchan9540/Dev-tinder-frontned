import React from 'react';
import { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../Utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';


const EditProfile = () => {
    const [emailId, setEmailId] = useState("dua9990@gmail.com");
   const [password, setPassword] = useState("Dua@k21234");
   const [error, setError] = useState("")
   const dispatch = useDispatch();

  return (
    <div className='flex justify-center ml-96 top-0'>
    <div className="card bg-neutral-400 w-96 shadow-sm">

<div className="card-body">
  <h2 className="card-title justify-center py-2">Edit Profile</h2>
  <div>
  <fieldset className="fieldset">
  <legend className="fieldset-legend">Email ID</legend>
  <input type="input" className="input" value={emailId}
    onChange={(e) => setEmailId(e.target.value)} />  {/* // Binding the EmailId into the input box */}
  </fieldset>
  <fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="password" className="input" value={password}
  onChange={(e) => setPassword(e.target.value)} />
  </fieldset>
  </div>
  <p className='text-red-500 '>{error}</p>
  <div className="card-actions justify-center">
    <button className="btn">Login</button>
  </div>
</div>
</div>
  </div>
  )
}

export default EditProfile
