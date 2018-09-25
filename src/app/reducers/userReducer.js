import { UPDATE_USER } from '../actions/userActions'
var init = {
    name: "Antti Auditoija",
    email: "antti@mail.com"
}

export default function userReducer(state= init, action){
    switch (action.type) {
        case UPDATE_USER:
            return action.payload ;
        default:
            return state;
    }
  
  }
  