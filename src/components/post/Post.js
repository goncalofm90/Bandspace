import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner } from "../layout/Spinner";
import { Link } from "react-router-dom";
import PostItem from "../posts/PostItem";
import { getPost } from "../../actions/post";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="/posts" className="btn btn-profile">
        Back
      </Link>
      <div className="bg-primary p">
        <h3>Discussion</h3>
      </div>
      <PostItem post={post} showActions={false} />
      <hr></hr>
      <div className="comments">
        {post.comments
          .map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))
          .reverse()}
      </div>
      <CommentForm postId={post._id} />
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
