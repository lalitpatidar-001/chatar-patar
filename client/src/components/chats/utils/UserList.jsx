import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchUsers } from '../../../redux/slices/app'
import UserListElement from './UserListElement'

const UserList = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(FetchUsers());
    }, [])

    const { users } = useSelector(state => state.app);
    console.log("users",users)
    return (
        <div className='flex flex-col gap-2 w-full' >
            {
                users?.map((user, index) => {
                    return <UserListElement {...user}/>
                })
            }
        </div>
    )
}

export default UserList