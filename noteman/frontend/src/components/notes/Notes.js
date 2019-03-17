import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNotes, deleteNote } from "../../actions/notesActions";

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
    return (
      <Fragment>
        <h2>Notes</h2>
        <table className="table table-striped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Created at</th>
            <th>Modified at</th>
            <th />
          </tr>
          </thead>
          <tbody>
          {notes.map(note => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.title}</td>
              <td>{note.body}</td>
              <td>{note.created_at}</td>
              <td>{note.modified_at}</td>
              <td>
                <button
                  type="button"
                  onClick={deleteNote.bind(this, note.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notesReducer.notes,
});

export default connect(mapStateToProps, { getNotes, deleteNote })(Notes);
