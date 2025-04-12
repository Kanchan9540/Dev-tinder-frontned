import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Utils/constants';

const Login = () => {
   const [emailId, setEmailId] = useState("dua9990@gmail.com");
   const [password, setPassword] = useState("Dua@k21234");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [isLoginForm, setIsLoginForm] = useState(true);
   const [error, setError] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();

  const handleLogin = async () => {

    try{ const res = await axios.post(
      BASE_URL + "/login",
       {
      emailId, 
      password,
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

   const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className='flex justify-center ml-96 top-0'>
      <div className="card bg-neutral-400 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center py-2"> 
    {isLoginForm ? "Login" : "Sign Up"}
    </h2>
    <div>
    {!isLoginForm && (
      <>
      <fieldset
     className="fieldset">
    <legend className="fieldset-legend">First Name</legend>
    <input type="input" className="input" value={firstName}
      onChange={(e) => setFirstName(e.target.value)} />  {/* // Binding the EmailId into the input box */}
    </fieldset>
    <fieldset
     className="fieldset">
    <legend className="fieldset-legend">Last Name</legend>
    <input type="input" className="input" value={lastName}
      onChange={(e) => setLastName(e.target.value)} />  {/* // Binding the EmailId into the input box */}
    </fieldset>
    </>
    )}
    <fieldset
     className="fieldset">
    <legend className="fieldset-legend">Email ID</legend>
    <input type="input" className="input" value={emailId}
      onChange={(e) => setEmailId(e.target.value)} />  {/* // Binding the EmailId into the input box */}
    </fieldset>
    <fieldset
     className="fieldset">
    <legend className="fieldset-legend">Password</legend>
    <input type="password" className="input" value={password}
    onChange={(e) => setPassword(e.target.value)} />
    </fieldset>
    </div>
   
    <p className='text-red-500 '>{error}</p>
    <div className="card-actions justify-center">
      <button className="btn" onClick={isLoginForm ? handleLogin : handleSignUp}>
      {isLoginForm? "Login": "Sign Up"}
      </button>
    </div>
    
    <p
           className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
    </p> 
  </div>
</div>
</div>
  )
}

export default Login;
