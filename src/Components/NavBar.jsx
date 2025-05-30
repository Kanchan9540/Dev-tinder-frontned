import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; 
import { BASE_URL } from '../Utils/constants';
import { removeUser } from '../Utils/userSlice';


const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      // Error logic maybe redirect to error page
      console.log(err);
    }
  };


  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white flex justify-between items-center px-6 py-4 shadow-lg">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl">👩‍💻DevTinder</Link>
    </div>
    {user && (
    <div className="flex">
      {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
      <div className='text-white m-2'>Welcome, {user.firstName}</div>
        <div className="dropdown dropdown-end flex">
        <div
         tabIndex={0}
          role="button"
           className="btn btn-ghost btn-circle avatar mx-5"
           >
          <div className="w-10 rounded-full ">
            <img
              alt="User Photo" src={user.photoUrl} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-8 w-52 p-2 shadow">
          <li>
            <Link to="/profile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
          <Link to="/connections">Connections</Link>
          </li>
          <li>
          <Link to="/requests">Requests</Link>
          </li>

          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </div>
  )}
  </div>
  );
};


export default NavBar;
