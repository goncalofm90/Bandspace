import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, title, name, avatar, user, likes, comments, date },

  showActions,
}) => (
  <div className="post bg-dark p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-imgpost" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <h2 className="my-1">{title}</h2>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
      </p>
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
