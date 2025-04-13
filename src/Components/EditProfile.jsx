import React from 'react';
import { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../Utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';


const EditProfile = ({ user }) => {
   const [firstName, setFirstName] = useState(user.firstName);
   const [lastName, setLastName] = useState(user.lastName);
   const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
   const [age, setAge] = useState(user.age || "");
   const [gender, setGender] = useState(user.gender || "");
   const [about, setAbout] = useState(user.about || "");
   const [error, setError] = useState("")
   const dispatch = useDispatch();
   const [showToast, setShowToast] = useState(false);

  const saveProfile =  async() => {
     //Clear Errors
     setError("");

    try{
       const res = await axios.patch(
         BASE_URL + "/profile/edit",
         {
          firstName,
          lastName, 
          photoUrl, 
          age, 
          gender, 
          about
         },
         { withCredentials: true }
       );
       console.log("✅ Response received:", res.data);
       dispatch(addUser(res?.data?.data));
       setShowToast(true);
       setTimeout(() => {
        setShowToast(false);
       }, 3000);
    } 
    catch(err){
      console.log("Error in API call:", err);
        setError(err.response?.data || "Something went wrong");
    }
  }

  return (
  <>
  <div className='flex justify-center ml-64 my-24'>
    <div className='flex justify-center top-0 mx-10'>
    <div className="card bg-neutral-400 w-96 shadow-sm">

<div className="card-body">
  <h2 className="card-title justify-center py-2">Edit Profile</h2>
  <div>
  
  <fieldset className="fieldset">
  <span className="fieldset-legend">First Name</span>
  <input type="input" className="input" value={firstName}
    onChange={(e) => setFirstName(e.target.value)} />  {/* // Binding the EmailId into the input box */}
  </fieldset>

  <fieldset className="fieldset">
  <span className="fieldset-legend">Last Name</span>
  <input type="input" className="input" value={lastName}
    onChange={(e) => setLastName(e.target.value)} />  {/* // Binding the EmailId into the input box */}
  </fieldset>

  <fieldset className="fieldset">
  <span className="fieldset-legend">Photo Url</span>
  <input type="input" className="input" value={photoUrl}
    onChange={(e) => setPhotoUrl(e.target.value)} />  {/* // Binding the EmailId into the input box */}
  </fieldset>

  <fieldset className="fieldset">
  <span className="fieldset-legend">Age</span>
  <input type="input" className="input" value={age}
    onChange={(e) => setAge(e.target.value)} />  {/* // Binding the EmailId into the input box */}
  </fieldset>

  <fieldset className="fieldset">
  <span className="fieldset-legend">Gender</span>
  <input type="input" className="input" value={gender}
    onChange={(e) => setGender(e.target.value)} />  {/* // Binding the EmailId into the input box */}
  </fieldset>

  <fieldset className="fieldset">
  <span className="fieldset-legend">About</span>
  <input type="input" className="input" value={about}
    onChange={(e) => setAbout(e.target.value)} />  {/* // Binding the EmailId into the input box */}
  </fieldset>

  
  </div>
  <p className='text-red-500 '>{error}</p>
  <div className="card-actions justify-center">
    <button className="btn" onClick={saveProfile}>Save Profile</button>
  </div>
</div>
</div>
  </div>
  <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }}/>
  
  </div>

  {showToast && (
    <div className="toast toast-top toast-center z-50 left-1/2 transform -translate-x-1/2  p-4 rounded-lg  text-center">
  <div className="alert alert-success">
    <span>Profile Save successfully.</span>
  </div>
</div>)}
  </>
  );
};

export default EditProfile;


// import React, { useState, useEffect } from 'react';
// import UserCard from './UserCard';
// import axios from 'axios';
// import { BASE_URL } from '../Utils/constants';
// import { useDispatch } from 'react-redux';
// import { addUser } from '../Utils/userSlice';

// const EditProfile = ({ user }) => {
//   const [firstName, setFirstName] = useState(user.firstName);
//   const [lastName, setLastName] = useState(user.lastName);
//   const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
//   const [age, setAge] = useState(user.age || "");
//   const [gender, setGender] = useState(user.gender || "");
//   const [about, setAbout] = useState(user.about || "");
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const [showToast, setShowToast] = useState(false);

//   useEffect(() => {
//     if (showToast) {
//       const timer = setTimeout(() => {
//         setShowToast(false);
//       }, 3000);

//       return () => clearTimeout(timer); // Cleanup the timer on unmount or showToast change
//     }
//   }, [showToast]);

//   const saveProfile = async () => {
//     setError("");
//     try {
//       const res = await axios.patch(
//         BASE_URL + "/profile/edit",
//         { firstName, lastName, photoUrl, age, gender, about },
//         { withCredentials: true }
//       );
//       console.log("✅ Response received:", res.data);
//       dispatch(addUser(res?.data?.data));
//       setShowToast(true);
//     } catch (err) {
//       console.log("Error in API call:", err);
//       setError(err.response?.data || "Something went wrong");
//     }
//   };

//   return (
//     <>
//       <div className='flex justify-center ml-64 my-24'>
//         <div className='flex justify-center top-0 mx-10'>
//           <div className="card bg-neutral-400 w-96 shadow-sm">
//             <div className="card-body">
//               <h2 className="card-title justify-center py-2">Edit Profile</h2>
//               <div>
//                 <fieldset className="fieldset">
//                   <span className="fieldset-legend">First Name</span>
//                   <input type="input" className="input" value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)} />
//                 </fieldset>

//                 <fieldset className="fieldset">
//                   <span className="fieldset-legend">Last Name</span>
//                   <input type="input" className="input" value={lastName}
//                     onChange={(e) => setLastName(e.target.value)} />
//                 </fieldset>

//                 <fieldset className="fieldset">
//                   <span className="fieldset-legend">Photo Url</span>
//                   <input type="input" className="input" value={photoUrl}
//                     onChange={(e) => setPhotoUrl(e.target.value)} />
//                 </fieldset>

//                 <fieldset className="fieldset">
//                   <span className="fieldset-legend">Age</span>
//                   <input type="input" className="input" value={age}
//                     onChange={(e) => setAge(e.target.value)} />
//                 </fieldset>

//                 <fieldset className="fieldset">
//                   <span className="fieldset-legend">Gender</span>
//                   <input type="input" className="input" value={gender}
//                     onChange={(e) => setGender(e.target.value)} />
//                 </fieldset>

//                 <fieldset className="fieldset">
//                   <span className="fieldset-legend">About</span>
//                   <input type="input" className="input" value={about}
//                     onChange={(e) => setAbout(e.target.value)} />
//                 </fieldset>
//               </div>
//               <p className='text-red-500'>{error}</p>
//               <div className="card-actions justify-center">
//                 <button className="btn" onClick={saveProfile}>Save Profile</button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
//       </div>

//       {/* Toast notification with Tailwind CSS */}
//       {showToast && (
//         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-80 p-4 bg-green-500 text-white rounded-lg shadow-lg z-50">
//           <div className="flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//             </svg>
//             <span>Profile saved successfully.</span>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditProfile;
