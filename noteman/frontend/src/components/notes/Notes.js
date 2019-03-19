import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteNote, getNotes, toggleEdit, updateNote } from "../../actions/notesActions";

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

    const handleSubmit = event => {
      event.preventDefault();
      const id = Number(event.target.id.value);
      const owner = Number(event.target.owner.value);
      const title = event.target.title.value;
      const body = event.target.body.value;
      const modified_at = new Date().toISOString();
      const created_at = event.target.created_at.value;
      const note = { id, title, body, modified_at, created_at, owner, "editing": false };
      // const { updateNote } = this.props;
      // console.log(note);

      updateNote(note);
      // console.log(body);
      // console.log(`Body: ${body}`);

    };
    const cardStyle = {
      maxWidth: "20rem",
    };
    const labelStyle = {
      width: "100%",
    };
    const inputStyle = {
      border: "none",
      width: "100%",
      background: "inherit",
    };

    const textareaStyle = {
      overflow: "hidden",
      width: "100%",
      border: "none",
      background: "inherit",
      resize: "none",
      outline: "none",
    };

    const editingCard = note => (
      <div className="card border-secondary mb-3" key={note.id} style={cardStyle}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h5 className="card-header">
              <label htmlFor="title" style={labelStyle}>
                <input
                  name="title"
                  className="form-control"
                  defaultValue={note.title}
                  style={inputStyle}
                />
                <input
                  name="id"
                  value={note.id}
                  type="hidden"
                />
                <input
                  name="owner"
                  value={note.owner}
                  type="hidden"
                />
                <input
                  name="created_at"
                  value={note.created_at}
                  type="hidden"
                />
              </label>
            </h5>
          </div>
          <div className="form-group card-body">
            <label htmlFor="body" style={labelStyle}>
              <textarea
                name="body"
                className="form-control"
                defaultValue={note.body}
                style={textareaStyle}
              />
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="card-link btn btn-info btn-sm">
              Submit
            </button>
          </div>
        </form>
      </div>
    );

    const savedCard = note => (
      <div className="card border-secondary mb-3" key={note.id} style={cardStyle}>
        <h5 className="card-header">{note.title}</h5>
        <div className="card-body">
          <p className="card-text">{note.body}</p>
        </div>
        <div className="card-footer text-muted">
          <button
            type="button"
            onClick={toggleEdit.bind(this, note.id)}
            className="card-link btn btn-info btn-sm"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={deleteNote.bind(this, note.id)}
            className="card-link btn btn-danger btn-sm"
          >
            Delete
          </button>
          <span className="badge badge-light">
            {"Created: "}
            {dateString(note.created_at)}
          </span>
          <span className="badge badge-light">
            {"Modified: "}
            {dateString(note.modified_at)}
          </span>
        </div>
      </div>
    );

    return (
      <Fragment>
        <h2>Notes</h2>
        {notes.map(note => note.editing ? editingCard(note) : savedCard(note))}
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
