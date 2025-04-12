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

//   const saveProfile = async () => {
//     setError("");

//     const requestData = {
//         firstName: firstName?.trim() || "",
//         lastName: lastName?.trim() || "",
//         photoUrl: photoUrl?.trim() || "",
//         age: age ? parseInt(age, 10) : 0,
//         gender: gender?.trim() || "unspecified",
//         about: about?.trim() || ""
//     };

//     console.log("📤 Sending data:", JSON.stringify(requestData, null, 2));

//     try {
//         const res = await axios.patch(
//             "http://localhost:3000/profile/edit",
//             requestData,
//             { withCredentials: true }
//         );

//         console.log("✅ Response received:", res.data);
//         dispatch(addUser(res?.data?.data));
//     } catch (err) {
//         console.error("❌ Error in API call:", err.response?.data || err);
//         setError(err.response?.data?.error || "Something went wrong");
//     }
// };


  return (
  <>
  <div className='flex justify-center my-30'>
    <div className='flex justify-center ml-96 top-0 mx-10'>
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
    <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Save successfully.</span>
  </div>
</div>)}
  </>
  );
};

export default EditProfile;
