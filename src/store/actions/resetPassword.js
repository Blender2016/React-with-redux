import * as actionsTypes from "./actionTypes";
import axios from "../../axios_base";

const onResetStart=()=>{
    return{
        type:actionsTypes.ON_LOGIN_START
    }
};
const onResetSuccess=()=>{
    return{
        type:actionsTypes.ON_RESET_SUCCESS
    }
};

const onResetFail=()=>{
    return{
        type:actionsTypes.ON_RESET_FAIL
    }
};

function gup( name, url ) {
    if (!url) url = window.location.href;
    // name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    name = name.replace(/[[]/,"\\[").replace(/[\]]/,"\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}


export const onResetPassword = (password)=>{
    console.log('url',window.location.href);
    return dispatch =>{
        console.log('loading ......');
        dispatch(onResetStart());
        var resetKey = gup('resetpasswordkey', window.location.href);
        console.log('Key:',resetKey);
        axios.post(`/resetpassword/${resetKey}`,password).then(res=>{
            console.log(res.data);
            dispatch(onResetSuccess());
        }).catch(err=>{
            console.log(err);
            console.log('faild');
            dispatch(onResetFail());
        });
    }
};