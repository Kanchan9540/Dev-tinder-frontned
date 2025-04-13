import axios from 'axios';
import { useEffect } from 'react';
import {BASE_URL} from "../Utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../Utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
      
    } catch (err) {
      //TODO: handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  
  if (!feed) return;

  if (feed.length === 0)
    return <h1 className="justify-center text-center ml-96 font-medium">No new users founds!</h1>;

  return (
    feed && (
   <div className='w-screen h-screen flex items-center justify-center'>
    <UserCard user={feed[0]} />
   </div>
    )
  );

};

export default Feed;

