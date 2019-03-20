// future replacement for Form.js
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addNote, deleteNote, getNotes, toggleEdit, updateNote } from "../../actions/notesActions";

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

const dateString = (unixTimeStamp) => {
  const date = new Date(unixTimeStamp);
  return date.toDateString();
};

class EditableNote extends Component {
  state = {
    title: "",
    body: "",
  };

  static defaultProps = {
    notes: [],
  };

  static propTypes = {
    notes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        owner: PropTypes.number,
        title: PropTypes.string,
        body: PropTypes.string,
        created_at: PropTypes.string,
        modified_at: PropTypes.string,
      })),
    deleteNote: PropTypes.func.isRequired,
    updateNote: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    getNotes: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { getNotes } = this.props;
    getNotes();
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleEdit = id => {
    const { toggleEdit } = this.props;
    toggleEdit(id);
  };

  handleUpdate = id => {
    const { title, body } = this.state;
    const modified_at = new Date().toISOString();
    const { updateNote } = this.props;
    const note = { id, title, body, modified_at };
    updateNote(note);
    this.setState({
      title: "",
      body: "",
    });
  };

  handleDelete = id => {
    const { deleteNote } = this.props;
    deleteNote(id);
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("handleSubmit");
    this.setState({
      title: "",
      body: "",
    });
  };

  render() {
    const { notes } = this.props;
    const { title, body } = this.state;

    return (
      <Fragment>
        {notes.map(note => (
          <div key={note.id} className="card card-body mt-4 mb-4">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                {note.editing ? (
                  <label htmlFor="title" style={labelStyle}>
                    <input
                      className="form-control"
                      style={inputStyle}
                      type="text"
                      name="title"
                      placeholder="Note Title"
                      onChange={this.onChange}
                      value={title}
                    />
                  </label>
                ) : note.title}
              </div>
              <div className="form-group">
                {note.editing ? (
                  <label htmlFor="body" style={labelStyle}>
                    <textarea
                      style={textareaStyle}
                      className="form-control"
                      name="body"
                      placeholder="What's it about?"
                      onChange={this.onChange}
                      value={body}
                    />
                  </label>
                ) : note.body}
              </div>
              <div className="form-group d-flex justify-content-around align-items-center">
                <span className="">
                  {`Created: ${dateString(note.created_at)}`}
                </span>
                <span className="">
                  {`Edited: ${dateString(note.modified_at)}`}
                </span>
                {note.editing ? (
                  <button
                    onClick={this.handleUpdate.bind(this, note.id)}
                    type="button"
                    className="btn btn-success"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={this.handleEdit.bind(this, note.id)}
                    type="button"
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={this.handleDelete.bind(this, note.id)}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        ))}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notesReducer.notes,
});

const mapDispatchToProps = {
  addNote,
  deleteNote,
  getNotes,
  toggleEdit,
  updateNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditableNote);
