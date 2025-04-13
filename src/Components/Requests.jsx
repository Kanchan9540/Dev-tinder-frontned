import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../Utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../Utils/requestSlice'

const Requests = () => {
const requests = useSelector((store) => store.requests);    
const dispatch = useDispatch(); 

const reviewRequest = async (status, _id) => {
  try{
     const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
   dispatch(removeRequest(_id));
  } catch(err){
    console.log(err);
  } 

   
};

 const fetchRequest = async () => {
    try{
        const res = await axios.get(BASE_URL + "/user/requests/received", {
            withCredentials: true,
        });

    dispatch(addRequests(res.data.data));  
    }
    catch (err){
        console.log(err);
    }
 };

 useEffect(() => {
    fetchRequest();
 }, []);
 

 if (!requests) return;

 if (requests.length === 0)
   return <h1 className="flex justify-center ml-96 font-medium"> No Requests Found</h1>;

 return (
   <div className="text-center">
     <h1 className="font-bold text-black text-2xl h-[80px] ml-80">Connection Requests</h1>

     {requests.map((request) => {
       const { _id, firstName, lastName, photoUrl, age, gender, about } =
         request.fromUserId;

       return (
         <div
           key={_id}
           className="flex m-4 p-4 rounded-lg bg-base-300 w-full ml-52 "
         >
           <div>
             <img
               alt="photo"
               className="w-22 h-20 rounded-full"
               src={photoUrl}
             />
           </div>
           <div className="text-left mx-4 ">
             <h2 className="font-bold text-xl">
               {firstName + " " + lastName}
             </h2>
             {age && gender && <p>{age + ", " + gender}</p>}
             <p>{about}</p>
           </div>
           <div className='gap-4 flex mx-4 ml-52'>
             <button
               className="btn border-2 transition hover:bg-blue-600 "
               onClick={() => reviewRequest("rejected", request._id)}
             >
               Reject
             </button>
             <button
               className="btn"
               onClick={() => reviewRequest("accepted", request._id)}
             >
               Accept
             </button>
           </div>
         </div>
       );
     })}
   </div>
 );
};

export default Requests
