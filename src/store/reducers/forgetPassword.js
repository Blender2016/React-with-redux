import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";


const initialState={
    resetKey:null,
    loading:false,
    error:null
}

const onSendingEmailStart=(state,action)=>{
    return updateObject(state,{
        loading:true
    }); 
};
export const onFindingEmailSuccess=(state,action)=>{
    console.log('key from forget :',action.resetKey);
    return updateObject(state,{
        loading:false,
        resetKey:action.resetKey
    });
};
const onFindingEmailFail=(state,action)=>{
    return updateObject(state,{
        loading:false
    });
};

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ON_SENDING_EMAIL_START: return onSendingEmailStart(state,action);
        case actionTypes.ON_FINDING_EMAIL_SUCCESS: return onFindingEmailSuccess(state,action);
        case actionTypes.ON_FINDING_EMAIL_FAIL: return onFindingEmailFail(state,action);
        default: return state;
    }
}

export default reducer;