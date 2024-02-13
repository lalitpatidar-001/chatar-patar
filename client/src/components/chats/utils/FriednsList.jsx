import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FetchFriends } from '../../../redux/slices/app';
import FriendsListElement from './FriendsListElement';

const FriednsList = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(FetchFriends());
    },[]);
    const {friends} = useSelector(state=>state.app);
  return (
    <div className='w-full'>
      {
        friends?.map((user,index)=>{
                return <FriendsListElement  {...user} />
        })
    }
    </div>
  )
}

export default FriednsList