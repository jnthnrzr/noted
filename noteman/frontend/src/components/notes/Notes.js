import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNotes, deleteNote } from "../../actions/notesActions";

const dateString = (unixTimeStamp) => {
  const date = new Date(unixTimeStamp);
  return date.toDateString();
};

class Notes extends Component {
  static propTypes = {
    notes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        body: PropTypes.string,
        created_at: PropTypes.string,
        modified_at: PropTypes.string,
      })
    ).isRequired,
    getNotes: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { getNotes } = this.props;
    getNotes();
  }

  render() {
    const { notes, deleteNote } = this.props;
    const cardStyle = {
      maxWidth: "20rem",
    };
    return (
      <Fragment>
        <h2>Notes</h2>
        {notes.map(note => (
          <div className="card border-secondary mb-3" key={note.id} style={cardStyle}>
            <h5 className="card-header">{note.title}</h5>
            <div className="card-body">
              <p className="card-text">{note.body}</p>
            </div>
            <div className="card-footer text-muted">
              <button
                type="button"
                onClick={deleteNote.bind(this, note.id)}
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
        ))}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notesReducer.notes,
});

export default connect(mapStateToProps, { getNotes, deleteNote })(Notes);
