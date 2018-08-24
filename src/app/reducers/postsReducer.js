import { FETCH_POST, SHOW_ERROR } from '../actions/postsActions';

export default function postsReducer(state=[], action){
    switch (action.type) {
      case FETCH_POST:
        return { 
          data: action.payload.data,
          error: false,
        }
      case SHOW_ERROR:
        return {
          data: [],
          error: action.payload.error.message,
        }
      default:
        return state;
    }
}