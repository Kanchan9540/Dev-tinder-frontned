import React from 'react'

const UserCard = ({user}) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

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

export default UserCard
