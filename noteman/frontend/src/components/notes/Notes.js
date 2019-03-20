import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { deleteNote, getNotes, toggleEdit, updateNote } from "../../actions/notesActions";

const deleteBtnStyle = {
  margin: "0 1rem",
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

class Notes extends Component {
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

  handleUpdate = note => {
    const { title, body } = this.state;
    const modified_at = new Date().toISOString();
    // const note = { id, title, body, modified_at };

    const { updateNote } = this.props;
    updateNote({
      id: note.id,
      title: title || note.title,
      body: body || note.body,
      modified_at
    });
    this.handleEdit(note.id);

    this.setState({
      title: "",
      body: "",
    });
  };

  handleDelete = id => {
    const { deleteNote } = this.props;
    deleteNote(id);
  };

  render() {
    const { notes } = this.props;

    return (
      <Fragment>
        {notes.map(note => (
          <div key={note.id} className="card card-body mt-4 mb-4">
            <form onSubmit={this.handleUpdate.bind(this, note)}>
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
                      defaultValue={note.title}
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
                      defaultValue={note.body}
                    />
                  </label>
                ) : note.body}
              </div>
              <div className="form-group d-flex justify-content-between align-items-center">
                <span>
                  <small>
                    {`Created: ${dateString(note.created_at)}`}
                  </small>
                </span>
                <div style={{width: "50%"}} className="d-flex justify-content-end">
                  {note.editing ? (
                    <button
                      onClick={this.handleUpdate.bind(this, note)}
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
                    style={deleteBtnStyle}
                  >
                    Delete
                  </button>
                </div>
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
  deleteNote,
  getNotes,
  toggleEdit,
  updateNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
