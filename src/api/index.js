import axios from 'axios'

const url = 'https://react-quizzer-ezzah.herokuapp.com/posts';
const userUrl = 'https://react-quizzer-ezzah.herokuapp.com/user';

export const fetchLists = () => axios.get(url);
export const createList = (newPost) => axios.post(url, newPost);
export const updateList = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deleteList = (id) => axios.delete(`${url}/${id}`);
export const getUsersList = ()=> axios.get(`${userUrl}/get-list`)
export const createUser = (newUser) => axios.post(`${userUrl}/create-user`, newUser);
export const fetchUser = async (user)=>{
    const response = await fetch('https://react-quizzer-ezzah.herokuapp.com/user/get-user',
    {
        method: 'POST', 
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                        email:user.email,
                        password:user.password
                    }
        )
    }
    )
    return  response.json();     
}
export const fetchUserScores = () => axios.get(`${url}/get-score`);
export const postUserScores = (newScore) => axios.post(`${url}/post-score`, newScore);