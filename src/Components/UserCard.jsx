import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../Utils/constants';
import {useDispatch} from "react-redux";
import { removeUserFromFeed } from '../Utils/feedSlice';

const UserCard = ({user}) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
    const dispatch = useDispatch(); 

    const handleSendRequest = async (status, userId) => {
      try {
        const res = await axios.post(
          BASE_URL + "/request/send/" + status + "/" + userId,
          {},
          { withCredentials: true }
        );
        dispatch(removeUserFromFeed(userId));
      } catch (err) {}
    };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={user.photoUrl}
      alt="Photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p>{age + "," + gender}</p>}
    <p>{about}</p>
    
    <div className="card-actions justify-center my-4">
     
      <button 
      className="btn bg-blue-600"
      onClick={() => handleSendRequest("ignored", _id)}
      >
      ignored
      </button>
     
      <button
            className="btn bg-pink-600"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
         
          </button>
    </div>
  </div>
</div>
  );
};

export default UserCard;
