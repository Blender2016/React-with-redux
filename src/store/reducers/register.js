import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";


const initialState={
    authToken:null,
    loading:false,
    error:null
}

const onRegisterStart = (state, action)=>{
    return updateObject(state,{
        loading:true
    })
};
const onRegisterSuccess =(state, action)=>{
    return updateObject(state,{
        loading:false,
        authToken:action.authToken
    })
};
const onRegisterFail = (state, action)=>{
    return updateObject(state,{
        loading:false
    })
};

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ON_REGISTER_START: return onRegisterStart(state,action);
        case actionTypes.ON_REGISTER_SUCCESS: return onRegisterSuccess(state,action);
        case actionTypes.ON_REGISTER_FAIL: return onRegisterFail(state,action);
        default: return state;
    }
}

export default reducer;
