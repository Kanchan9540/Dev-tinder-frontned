import React from 'react'
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import axios from "axios";
import {BASE_URL} from "../Utils/constants";
import { useEffect } from "react";
import {addUser} from "../Utils/userSlice";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";



const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
     if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
  
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
        <NavBar />
        <Outlet /> {/*any children routes of body will rendered over here */}
        <Footer />
    </div>
  );
};

export default Body;
