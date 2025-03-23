import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Utils/constants';

const Login = () => {
   const [emailId, setEmailId] = useState("dua9990@gmail.com");
   const [password, setPassword] = useState("Dua@k21234");
   const [error, setError] = useState("")
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogin = async () => {

    try{ const res = await axios.post(
      BASE_URL + "/login",
       {
      emailId, password,
     },
    {withCredentials: true}
  );
  //console.log(res.data);
  dispatch(addUser(res.data));  //add data into the store
   return navigate("/");
  } catch(err){
    setError(err?.response?.data || "Something went wrong");
  }
   };

  return (
    <div className='flex justify-center ml-96 top-0'>
      <div className="card bg-neutral-400 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center py-2"> Login</h2>
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
      <button className="btn" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login;
