import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FetchFriendsRequests } from '../../../redux/slices/app';
import FriendRequestElement from './FriendRequestElement';

const RequestsList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(FetchFriendsRequests());
    }, []);
    const { friendRequests } = useSelector(state => state.app);
    console.log("friendRequests",friendRequests)

    return (
        <div className='flex flex-col gap-2 w-full'>
            {
                friendRequests?.map((user, index) => {
                    return <FriendRequestElement
                        key={user._id}
                        {...user.sender} id={user._id} />
                })
            }
        </div>
    )
}

export default RequestsList