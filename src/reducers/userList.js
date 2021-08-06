// eslint-disable-next-line import/no-anonymous-default-export
import {USER_LIST} from '../constants/actionTypes';
// eslint-disable-next-line import/no-anonymous-default-export
export default (states = [],action)=>{

switch(action.type){
    case USER_LIST:
        return [...states, action.payload];
    default:
        return states
}
}
