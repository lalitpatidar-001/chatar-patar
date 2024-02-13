import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { socket } from "../../socket";

//1. create initial state
const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false,
    email:"",
    error:false,
}

//2.  create slice and define reducers
const slice = createSlice({
    name: "auth", // name of slice 
    initialState,
    // define reducers
    reducers: {
        logIn(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;

        },
        signOut(state, action) {
            state.isLoggedIn = false;
            state.token = "";
        },
        updateIsLoading(state,action){
            state.error = action.payload.error;
            state.isLoading = action.payload.isLoading
        },
        updateRegisterEmail(state,action){
            state.email=action.payload.email;
        }
    }
});

// 3. export reducers 
export default slice.reducer;

// create thunks (higher order function)

export function LoginUser(formValues) {
    // formValues => {email , password}
    return async (dispatch,getState) => {
        await axios.post("/auth/login", { ...formValues, },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            ).then((response)=>{
                console.log(response);
                dispatch(
                    slice.actions.logIn({
                    isLoggedIn:true,
                    token:response.data.token
                }))
                window.localStorage.setItem("user_id",response.data.user_id);

            }).catch((error)=>{
                    console.log(error)
            })
    }

}

export function Logout(){
    return async (dispatch,getState)=>{
        window.localStorage.removeItem("user_id");
        socket.disconnect();
        dispatch(
            slice.actions.signOut()
        );

    }
};

export function ForgotPassword(formValues){
    return async (dispatch , getState)=>{
        await axios.post(
            "/auth/forgot-password",
            {...formValues},
            {
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((response)=>{
                    console.log(response)

            }).catch((error)=>{
                    console.log(error)
            });
    }
}

export function NewPassword (formValues){
    console.log("formvalues ",formValues);
    return async (dispatch,getState)=>{
            await axios.post(
                "/auth/reset-password",
                {...formValues},
            {
                headers:{
                    "Content-Type":"application/json"
                },
            })
            .then((response)=>{
                console.log(response)
                dispatch(slice.actions.logIn({
                    isLoggedIn:true,
                    token: response.data.token,
                }))
            })
            .catch((error)=>{
                console.log(error)
            })
    }
}

export function RegisterUser (formValues){
    return async (dispatch,getState)=>{
        dispatch(slice.actions.updateIsLoading({isLoading:true,error:false}))
        await axios.post("/auth/register",
        {...formValues},
        {
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{
                console.log(response)
                dispatch(slice.actions.updateRegisterEmail({email:formValues.email}));
                dispatch(slice.actions.updateIsLoading({isLoading:false,error:false}))
        })
        .catch((error)=>{
                console.log(error)
                dispatch(slice.actions.updateIsLoading({isLoading:false,error:true}))
        })
        .finally(()=>{
            if(!getState().auth.error){
                window.location.href="/auth/verify-otp";
            }
        })
    }
};

export function VerifyEmail (formValues){
    return async (dispatch,getState)=>{
        await axios.post("/auth/verify-otp",
        {...formValues},
        {
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{
                console.log(response)
                dispatch(slice.actions.logIn({
                    isLoggedIn:true,
                    token:response.data.token,
                }));
                window.localStorage.setItem("user_id",response.data.user_id);
        })
        .catch((error)=>{
         console.log(error)
        })
    }
} 