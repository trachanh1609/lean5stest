import axios from 'axios';

export const FETCH_POST = 'posts:fetchPosts';
export const SHOW_ERROR = 'posts:showError';

export function apiRequest(){
    return dispatch => {
        axios.get("http://localhost:4000/api1/posts")
            .then(response=>{
                // console.log(response.data);
                dispatch({
                    type: FETCH_POST,
                    payload: { 
                        data: response.data,
                    }
                });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: SHOW_ERROR,
                    payload: {
                        error: error,
                    }
                })
            })
    }
}