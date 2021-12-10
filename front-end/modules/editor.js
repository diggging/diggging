// import { createStore } from 'redux';

/* action type */
const CHANGE_DESC = 'editor/CHANGE_DESC';

/* action func */
export const setDesc = desc => ({ type: CHANGE_DESC, desc });

/* initialState */
const initialState = {
  desc: ''
};

/* reducer */
export default function saveContent(state = initialState, action) {
  switch(action.type) {
    case CHANGE_DESC:
      return {
        ...state,
        desc: action.desc
      }
    default:
      return state
  }
}



