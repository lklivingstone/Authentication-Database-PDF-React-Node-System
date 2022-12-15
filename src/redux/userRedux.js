import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        error: false,
    },
    reducers: {
        loginSuccess: (state, action)=> {
            state.user= action.payload
        },
        loginFailure: (state) => {
            state.error= true
        },
        logOut: (state)=> {
            state.user= null
            state.error= false
        }
    }
})

export const { loginFailure, loginSuccess, logOut } = userSlice.actions
export const selectUser = (state) => state.user.user
export default userSlice.reducer