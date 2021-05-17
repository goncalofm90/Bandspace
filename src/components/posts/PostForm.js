import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Join the party !</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text, title });
          setText("");
          setTitle("");
        }}
      >
        <textarea
          name="text"
          value={title}
          cols="1"
          rows="1"
          placeholder="Topic title"
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "10px" }}
          maxLength="60"
          required
        ></textarea>
        <textarea
          name="text"
          value={text}
          cols="30"
          rows="5"
          placeholder="New topic"
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input
          type="submit"
          className="btn btn-primary my-1"
          value="Create Topic"
        />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
