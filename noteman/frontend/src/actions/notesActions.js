import axios from "axios";
import { createMessage, returnErrors } from "./messagesActions";
import { tokenConfig } from "./authActions";

import { GET_NOTES, DELETE_NOTE, ADD_NOTE } from "./types";

// GET NOTES
export const getNotes = () => (dispatch, getState) => {
  axios
    .get("/api/notes/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_NOTES,
        payload: res.data
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
