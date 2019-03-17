import { GET_NOTES, DELETE_NOTE, ADD_NOTE, CLEAR_NOTES } from "../actions/types";

const initialState = {
  notes: []
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload)
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload]
      };
    case CLEAR_NOTES:
      return {
        ...state,
        notes: []
      };
    default:
      return state;
  }
};

export default notesReducer;
