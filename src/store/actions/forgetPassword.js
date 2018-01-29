import * as actionsTypes from "./actionTypes";
import axios from "../../axios_base";

const onSendingEmailStart=()=>{
    return {
        type:actionsTypes.ON_SENDING_EMAIL_START
    }
};

const onFindingEmailSuccess=()=>{
    return{
        type:actionsTypes.ON_FINDING_EMAIL_SUCCESS,
    }
};

const onFindingEmailFail=()=>{
    return{
        type:actionsTypes.ON_FINDING_EMAIL_FAIL
    }
};

export const onSendingEmail = (email)=>{
    return dispatch =>{
        console.log('loading ....');
        dispatch(onSendingEmailStart());
        axios.post('/forgetpassword',email).then(res=>{
            dispatch(onFindingEmailSuccess());
            console.log(res.data);
        }).catch(err=>{
            console.log(err);
            dispatch(onFindingEmailFail());
        });
    }
};
