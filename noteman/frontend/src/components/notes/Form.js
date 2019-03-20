import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addNote } from "../../actions/notesActions";

class Form extends Component {
  state = {
    title: "",
    body: "",
  };

  static propTypes = {
    addNote: PropTypes.func.isRequired,
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = event => {
    event.preventDefault();

    const { title, body } = this.state;
    const note = { title, body };

    const { addNote } = this.props;
    addNote(note);
    this.setState({
      title: "",
      body: "",
    });
  };

  render() {
    const { title, body } = this.state;
    const labelStyle = {
      width: "100%",
    };

    const inputStyle = {
      border: "none",
    };

    const textareaStyle = {
      resize: "none",
      outline: "none",
      border: "none",
    };

    return (
      <div className="card card-body border-primary mt-4 mb-4">
        <h4>Add Note</h4>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title" style={labelStyle}>
              <input
                className="form-control"
                style={inputStyle}
                type="text"
                name="title"
                placeholder="Enter Title"
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
                placeholder="Enter Text"
                onChange={this.onChange}
                value={body}
              />
            </label>
          </div>
          <div className="form-group d-flex justify-content-end">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addNote })(Form);
