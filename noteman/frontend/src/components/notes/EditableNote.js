// future replacement for Form.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addNote, updateNote } from "../../actions/notesActions";

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

const cardStyle = {
  // maxWidth: "20rem",
};

class EditableNote extends Component {
  state = {
    title: "",
    body: "",
  };

  static defaultProps = {
    note: {},
  };

  static propTypes = {
    note: PropTypes.shape({
        id: PropTypes.number,
        owner: PropTypes.number,
        title: PropTypes.string,
        body: PropTypes.string,
        created_at: PropTypes.string,
        modified_at: PropTypes.string,
      }),
    addNote: PropTypes.func.isRequired,
    updateNote: PropTypes.func.isRequired,
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, body } = this.state;

    const { note } = this.props;
    if (note) {
      const { updateNote } = this.props;
      updateNote({
        ...note,
        title,
        body,
        modified_at: new Date().toISOString(),
      });
    } else {
      const newNote = { title, body };
      const { addNote } = this.props;
      addNote(newNote);
    }

    this.setState({
      title: "",
      body: "",
    });
  };

  render() {
    const { note } = this.props;
    const { title, body } = this.state;

    return (
      <div className="card card-body mt-4 mb-4">

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title" style={labelStyle}>
              <input
                className="form-control"
                style={inputStyle}
                type="text"
                name="title"
                placeholder="Title"
                onChange={this.onChange}
                value={title}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="body" style={labelStyle}>
              <textarea
                style={textareaStyle}
                className="form-control"
                name="body"
                placeholder="Text"
                onChange={this.onChange}
                value={body}
              />
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              {note ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    );

    // return (
    //   <div className="card border-secondary mb-3" key={note.id} style={cardStyle}>
    //     <form onSubmit={this.handleSubmit}>
    //       <div className="form-group card-header">
    //         <label htmlFor="title" style={labelStyle}>
    //           <input
    //             name="title"
    //             className="form-control"
    //             defaultValue={note.title}
    //             style={inputStyle}
    //           />
    //         </label>
    //       </div>
    //       <div className="form-group card-body">
    //         <label htmlFor="body" style={labelStyle}>
    //           <textarea
    //             name="body"
    //             className="form-control"
    //             defaultValue={note.body}
    //             style={textareaStyle}
    //           />
    //         </label>
    //       </div>
    //       <div className="form-group">
    //         <button type="submit" className="card-link btn btn-info btn-sm">
    //           Submit
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = { addNote, updateNote };

export default connect(mapStateToProps, mapDispatchToProps)(EditableNote);
