import {
  ADD_NOTE,
  CLEAR_NOTES,
  DELETE_NOTE,
  GET_NOTES,
  TOGGLE_EDIT,
  UPDATE_NOTE
} from "../actions/types";

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
    case TOGGLE_EDIT:
      return {
        ...state,
        notes: state.notes.map(note => {
          if (note.id === action.payload)
            note.editing = !note.editing;
          return note;
        }),
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload)
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: [
          ...state.notes.map(note => {
            if (note.id === action.payload.id) {
              return {
                ...note,
                ...action.payload,
              };
            }
            return note;
          }),
        ]
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
