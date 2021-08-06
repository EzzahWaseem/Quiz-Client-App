// eslint-disable-next-line import/no-anonymous-default-export
import { FETCH_SCORE,POST_SCORE} from '../constants/actionTypes';
// eslint-disable-next-line import/no-anonymous-default-export
export default (states = [],action)=>{

switch(action.type){
    case FETCH_SCORE:
        return [...states, action.payload];
    case POST_SCORE:
        return [...states, action.payload];
    default:
        return states
}
}
