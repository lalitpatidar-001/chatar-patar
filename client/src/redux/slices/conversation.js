import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios.js"
import { useRef } from "react";

const user_id = window.localStorage.getItem("user_id")

const initialState = {
    direct_chat: {
        conversations: [],
        current_conversation: null,
        current_messages: [],
    },
    group_chat: {

    },
    scrollRef: null
}

const slice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        fetchDirectConversation(state, action) {
            const list = action.payload.conversations?.map((el) => {
                const this_user = el.participants.find((elm) => {
                    return elm._id.toString() !== user_id // getting opponent user
                });

                return {
                    id: el._id, // convo id
                    to_user: this_user.id,
                    name: `${this_user.firstName} ${this_user.lastName}`,
                    online: this_user.status === "Online",
                    img: "",
                    msg: "hello ji",
                    time: "9:36",
                    unread: 0,
                    pinned: false,
                };
            })
            state.direct_chat.conversations = list;
        },

        // 
        updateDirectConversation(state, action) {
            // list = list.map((el)=>el.id === data.id ?data : el);
            const this_conversation = action.payload.conversation;

            state.direct_chat.conversations = state.direct_chat.conversations?.map((el) => {
                if (el.id !== this_conversation._id) {
                    return el;
                }
                else {
                    const user = this_conversation.participants.find((elm) => {
                        return elm.id.toString() !== user_id
                    }) // getting other user

                    return {
                        id: this_conversation._id,
                        user_id: user._id,
                        name: `${user.firstName} ${user.lastName}`,
                        online: user.status === "Online",
                        img: "",
                        time: "9:37",
                        unread: 0,
                        pinned: false,
                        lastMessage:this_conversation.message
                    }
                }
            })
        },

        // 
        addDirectConversation(state, action) {

            // list.push(data)
            const this_conversation = action.payload.conversation;
            // console.log("this_conversation",this_conversation)

            const user = this_conversation.participants?.find((elm) => {
                return elm._id.toString() !== user_id
            }) // getting other user


            state.direct_chat.conversations?.push({
                id: this_conversation._id,
                user_id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                online: user.status === "Online",
                img: "",
                time: "9:37",
                unread: 0,
                pinned: false,
                lastMessage:this_conversation.message
            });
        },
        updateCurrentMessages(state, action) {
            // console.log("action",action.payload)
            state.direct_chat.current_messages = action.payload.current_messages;
        },
        addNewCurrentMessage(state, action) {
            return {
                ...state,
                direct_chat: {
                    ...state.direct_chat,
                    current_messages: [...state.direct_chat.current_messages, action.payload.new_message]
                }
            };
        },
        updateUseRef(state,action){
            return state.scrollRef = action.payload.scrollRef;
        }


    }
})

export default slice.reducer;

export const FretchDirectConversation = ({ conversations }) => {
    // console.log("in fetch",conversations)
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchDirectConversation({
            conversations: conversations
        }))
    }
};
export const AddDirectConversation = ({ conversation }) => {
    // console.log("conversation",conversation)
    return async (dispatch, getState) => {
        dispatch(slice.actions.addDirectConversation({
            conversation: conversation
        }))
    }
};
export const UpdateDirectConversation = ({ conversation }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateDirectConversation({
            conversation: conversation
        }))
    }
};

export const UpdateCurrentMessages = ({ current_messages }) => {
    // console.log("in fetch current_messages",current_messages)
    return (dispatch, getState) => {
        dispatch(slice.actions.updateCurrentMessages({
            current_messages
        }))

    }
}

export const AddNewCurrentMessage = ({ new_message }) => {
    // console.log("new_message --> ",new_message)
    return (dispatch, getState) => {
        dispatch(slice.actions.addNewCurrentMessage({
            new_message
        }));

         // Scroll to the new message
         const scrollRef = getState().conversation.scrollRef;
         console.log("scrollRef",scrollRef)
         if (scrollRef && scrollRef.current) {
            console.log("changin scrool")
             scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
         }
    }
}

export const  UpdateScrollUseRef = ({scrollRef})=>{
    return (dispatch,getState)=>{
        dispatch(slice.actions.updateUseRef({

        }))
    }
}