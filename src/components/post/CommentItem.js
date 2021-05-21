import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import {
  addLikeComment,
  removeLikeComment,
  removeComment,
} from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, likes, date },
  auth,
  removeComment,
  removeLikeComment,
  addLikeComment,
  showActions,
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-imgpost" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
      </p>
      {auth.isAuthenticated &&
      likes.filter((like) => like.user === auth.user._id).length > 0 ? (
        <button
          onClick={(e) => removeLikeComment(postId, _id)}
          type="button"
          className="btn-comment btn-primary"
        >
          <i className="far fa-arrow-alt-circle-up"></i>{" "}
          <span>{likes.length}</span>
        </button>
      ) : (
        <button
          onClick={(e) => addLikeComment(postId, _id)}
          type="button"
          className="btn-comment btn-light"
        >
          <i className="far fa-arrow-alt-circle-up"></i>{" "}
          <span>{likes.length}</span>
        </button>
      )}

      {!auth.loading && user === auth.user._id && (
        <button
          onClick={(e) => removeComment(postId, _id)}
          type="button"
          className="btn-comment btn-primary"
        >
          <i className="far fa-trash-alt"></i>
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired,
  addLikeComment: PropTypes.func.isRequired,
  removeLikeComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

CommentItem.defaultProps = {
  showActions: true,
};

export default connect(mapStateToProps, {
  addLikeComment,
  removeLikeComment,
  removeComment,
})(CommentItem);
