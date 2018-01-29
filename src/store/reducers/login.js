import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";


const initialState={
    authToken:null,
    loading:false,
    error:null
}

const onLoginStart=(state,action)=>{
    return updateObject(state,{
        loading:true
    });
};
const onLoginSuccess=(state,action)=>{
    return updateObject(state,{
        authToken:action.authToken,
        loading:false
    });
};
const onLoginFail=(state,action)=>{
    return updateObject(state,{
        loading:false
    });
};

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ON_LOGIN_START: return onLoginStart(state,action);
        case actionTypes.ON_LOGIN_SUCCESS: return onLoginSuccess(state,action);
        case actionTypes.ON_LOGIN_FAIL: return onLoginFail(state,action);
        default: return state;
    }
}

export default reducer;
