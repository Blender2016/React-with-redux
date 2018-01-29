import * as actionTypes from "./actionTypes";
import axios from "../../axios_base";


const onRegisterStart = ()=>{
    return {
        type:actionTypes.ON_REGISTER_START
    };
};
const onRegisterFail = ()=>{
    return {
        type: actionTypes.ON_REGISTER_FAIL
    };
};
const onRegisterSuccess = (token)=>{   // dispatch an action the reducer will listen to it and change the state in the store
    return {
        type:actionTypes.ON_REGISTER_SUCCESS,
        authToken:token
    };
};

export const onRegister = (formData)=>{
    console.log('sending .....');
    return dispatch=>{
       dispatch(onRegisterStart());
       axios.post('/register' , formData).then(res=>{       
            console.log('status :',res.status); 
            // var token = res.headers['x-auth']; ///fetch x-auth from the header .
            var token = res.data.tokens[0].token;
            console.log('tokens',token);   
            dispatch(onRegisterSuccess(token));
       }).catch(err=>{
        dispatch(onRegisterFail(err));
        console.log(err);
       });
    }
};