import * as api from '../api'
import { FETCH_ALL, CREATE, UPDATE, DELETE ,FETCH_USER,CREATE_USER,USER_LIST,FETCH_SCORE,POST_SCORE} from '../constants/actionTypes';

export const getList = () => async (dispatch) => {
    try {
      const { data } = await api.fetchLists();
  
      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error.message);
      
    }
  };
  
  export const createList = (post) => async (dispatch) => {
      try {
      const { data } = await api.createList(post);
  
      dispatch({ type: CREATE, payload: data });
    } catch (error) {
      console.log(error.message);

    }
  };
  
  export const updateList = (id, post) => async (dispatch) => {
    try {
      const { data } = await api.updateList(id, post);
  
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  
  
  export const deleteList = (id) => async (dispatch) => {
    try {
      await api.deleteList(id);
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const getUserListData = () => async (dispatch) => {
    try {
      const { data } = await api.getUsersList();
  
      dispatch({ type: USER_LIST, payload: data });
    } catch (error) {
      console.log(error.message);
  alert(error.message)

    }
  };

  export const fetchUserData = (res) => async (dispatch) => {
    try {
    const { user } = await api.fetchUser(res);
    dispatch({ type: FETCH_USER, payload: user });
  } catch (error) {
    console.log(error.message);

  }
};

export const createUserData = (res) => async (dispatch) => {
  try {
  const { user } = await api.createUser(res);
  dispatch({ type: CREATE_USER, payload: user });
  alert("Created User Successfully")
} catch (error) {
  console.log(error.message);
}
};

export const getScore = (res) => async (dispatch) => {
  try {
    const { data } = await api.fetchUserScores();

  dispatch({ type: FETCH_SCORE, payload: data });
} catch (error) {
  console.log(error.message);
}
};

export const postScore = (post) => async (dispatch) => {
    try {
    const { data } = await api.postUserScores(post);

    dispatch({ type: POST_SCORE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};