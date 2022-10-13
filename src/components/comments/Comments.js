import { useState, useEffect, useCallback } from "react";
import { useParams} from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";

import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";

import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
  const params = useParams();
  const quoteId = params.quoteId;

  const [isAddingComment, setIsAddingComment] = useState(false);

  const {
    sendRequest,
    data: loadedComments,
    status,
  } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
    setIsAddingComment((prev) => !prev);
  }, [sendRequest, quoteId]);

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <h5 className="centered">No Comments were added yet</h5>;
  }

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          onAddedComment={addedCommentHandler}
          quoteId={quoteId}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
