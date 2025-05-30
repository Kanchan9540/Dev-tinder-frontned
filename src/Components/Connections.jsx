import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../Utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../Utils/connectionSlice';
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <h2 className="text-center text-black">Loading...</h2>;
  if (connections.length === 0) return <h1 className="flex ml-96 text-center text-black">No Connections Found</h1>;

return (
    <div className='text-center'>
      <h1 className='font-bold text-black text-2xl h-[80px]'>Connections</h1>

      {/* ✅ Render connections list */}
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-full"
          >
            <div>
              <img
                alt="photo"
                className="w-22 h-20 rounded-full object-cover"
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
            <Link to={"/chat/" + _id}>
              <button className="btn bg-blue-800 hover:bg-blue-600 text-black border-2 transition ml-60">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
);
};

export default Connections;
