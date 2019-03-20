import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteNote, getNotes, toggleEdit, updateNote } from "../../actions/notesActions";
import EditableNote from './EditableNote';

const dateString = (unixTimeStamp) => {
  const date = new Date(unixTimeStamp);
  return date.toDateString();
};

class Notes extends Component {
  static propTypes = {
    notes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        owner: PropTypes.number,
        title: PropTypes.string,
        body: PropTypes.string,
        created_at: PropTypes.string,
        modified_at: PropTypes.string,
      })
    ).isRequired,
    getNotes: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    updateNote: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { getNotes } = this.props;
    getNotes();
  }

  render() {
    const { notes, deleteNote, updateNote, toggleEdit } = this.props;

    // const handleSubmit = event => {
    //   event.preventDefault();
    //   const id = Number(event.target.id.value);
    //   const owner = Number(event.target.owner.value);
    //   const title = event.target.title.value;
    //   const body = event.target.body.value;
    //   const modified_at = new Date().toISOString();
    //   const created_at = event.target.created_at.value;
    //   const note = { id, title, body, modified_at, created_at, owner, "editing": false };
    //   updateNote(note);
    //
    // };
    const cardStyle = {
      maxWidth: "20rem",
    };

    return (
      <Fragment>
        {notes.map(note => <EditableNote note={note} key={note.id} />)}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notesReducer.notes,
});

const mapDispatchToProps = {
  deleteNote,
  getNotes,
  toggleEdit,
  updateNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
