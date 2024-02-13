import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios.js"


const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT" // STARED , SHARED
    },
    users:[],
    friends:[],
    friendRequests:[],
    chat_type:null, // group or individual
    room_id:null,

}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleSidebar(state, action) {
            console.log("ran")
            state.sidebar.open = !state.sidebar.open;
        },
        updateSidebarTypes(state, action) {
            state.sidebar.type = action.payload.type;
        },
        updateUsers(state,action){
            state.users = action.payload.users;
        },
        updateFriends(state,action){
            state.friends = action.payload.friends;
        },
        updateFriendRquests(state,action){
            console.log("action",action)
            state.friendRequests = action.payload.friendRequests;
        },
        selectConversation(state,action){
            state.chat_type="individual";
            state.room_id=action.payload.room_id
        }

    }
})

export default slice.reducer;

// thunk functions
 function ToggleSidebar() {
    console.log("ran")
    return async (dispatch) => {
        console.log("toggle bar thunk")
        dispatch(slice.actions.toggleSidebar());
    }
}
 function UpdateSidebarType(type) {
    return async (dispatch) => {
        dispatch(slice.actions.updateSidebarTypes({ type }));
    }
}

export const FetchUsers = ()=>{
    return async (dispatch , getState)=>{
        await axios.get(`/user/get-users`,
        {
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${getState().auth.token}`
            }
        })
        .then((response)=>{
           console.log(response)
           dispatch(slice.actions.updateUsers({users:response.data.data}))
        }).catch((error)=>{
            console.log(error)
        })
    }
}
export const FetchFriends = ()=>{
    return async (dispatch , getState)=>{
        await axios.get(`/user/get-friends`,
        {
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${getState().auth.token}`
            }
        })
        .then((response)=>{
           console.log(response)
           dispatch(slice.actions.updateFriends({friends:response.data.data}))
        }).catch((error)=>{
            console.log(error)
        })
    }
}
export const FetchFriendsRequests = ()=>{
    return async (dispatch , getState)=>{
        await axios.get(`/user/get-friend-requests`,
        {
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${getState().auth.token}`
            }
        })
        .then((response)=>{
           console.log("friend request ",response.data.data)
           dispatch(slice.actions.updateFriendRquests({friendRequests:response.data.data}))
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export const SelectConversation = ({room_id})=>{
    console.log("in fetc room id ",room_id)
    return (dispatch,getState)=>{
        dispatch(slice.actions.selectConversation({room_id}))
    }
}

export {ToggleSidebar,UpdateSidebarType}