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

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Note</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              onChange={this.onChange}
              value={title}
            />
          </div>
          <div className="form-group">
            <label>Body</label>
            <textarea
              className="form-control"
              name="body"
              onChange={this.onChange}
              value={body}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addNote })(Form);
