import { publicRequest } from "../requestMethods"
import { loginFailure, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
    try{
        const res= await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
    }catch(err) {
        dispatch(loginFailure())
    }
}

export const entry= async (data) => {
    try {
        console.log(data)
        const res= await publicRequest.post("/entry", data)
        res.status(200).json(res)
    }
    catch (err) {
    }
}
