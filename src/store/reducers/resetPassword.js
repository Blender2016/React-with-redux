import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState={
    loading:false,
    error:null
}

const onResetStart=(state,action)=>{
    return updateObject(state,{
        loading:true
    });
};
const onResetSuccess=(state,action)=>{
    return updateObject(state,{
        loading:false
    });
};

const onResetFail=(state,action)=>{
    return updateObject(state,{
        loading:false
    });
};

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ON_RESET_START: return onResetStart(state,action);
        case actionTypes.ON_RESET_SUCCESS: return onResetSuccess(state,action);
        case actionTypes.ON_RESET_FAIL: return onResetFail(state,action);
        default: return state;
    }
}

export default reducer;