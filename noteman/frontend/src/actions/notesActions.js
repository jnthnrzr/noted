import axios from "axios";
import { createMessage, returnErrors } from "./messagesActions";
import { tokenConfig } from "./authActions";

import { ADD_NOTE, DELETE_NOTE, GET_NOTES, TOGGLE_EDIT, UPDATE_NOTE } from "./types";

// GET NOTES
export const getNotes = () => (dispatch, getState) => {
  axios
    .get("/api/notes/", tokenConfig(getState))
    .then(res => {
      const { data } = res;
      const payload = data.map(note => (
        { ...note, editing: false }
        )
      );
      dispatch({
        type: GET_NOTES,
        payload: payload,
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// TOGGLE EDIT FOR SPECIFIC NOTE
export const toggleEdit = id => dispatch => {
  dispatch({
    type: TOGGLE_EDIT,
    payload: id,
  });
};

// UPDATE NOTE
export const updateNote = note => (dispatch, getState) => {
  axios
    .put(`/api/notes/${note.id}/`, note, tokenConfig(getState))
    .then(() => {
      dispatch(createMessage({ updateNote: "Note Updated" }));
      dispatch({
        type: UPDATE_NOTE,
        payload: note,
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE NOTE
export const deleteNote = id => (dispatch, getState) => {
  axios
    .delete(`/api/notes/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch(createMessage({ deleteNote: "Note Deleted" }));
      dispatch({
        type: DELETE_NOTE,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD NOTE
export const addNote = note => (dispatch, getState) => {
  axios
    .post("/api/notes/", note, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addNote: "Note Added" }));
      dispatch({
        type: ADD_NOTE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
