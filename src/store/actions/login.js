import * as actionTypes from "./actionTypes";
import axios from "../../axios_base";

const onLogInStart = ()=>{
    return {
        type:actionTypes.ON_LOGIN_START
    }
};

const onLogInSuccess = (token)=>{
    return{
        type:actionTypes.ON_LOGIN_SUCCESS,
        authToken:token
    }
};

const onLogInFail = ()=>{
    return{
        type:actionTypes.ON_LOGIN_FAIL
    }
};


export const onLogin=(userData)=>{
    return dispatch=>{
        console.log('loading....');
        dispatch(onLogInStart());
        axios.post('/login',userData).then(res=>{
            console.log(res.data);
            var token = res.data.tokens[0].token;
            dispatch(onLogInSuccess(token));
        }).catch(err=>{
            dispatch(onLogInFail());
        });
    };
};
