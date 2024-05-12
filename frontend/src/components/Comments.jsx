import Comment from "./Comment";
import "../style/Comments.scss";

const Comments = ({ chatDetails, setChatDetails, totalComments }) => {
  return (
    <div className="comments-container">
      <div className="comments-container-header">{`${totalComments} ${
        totalComments === 1 ? "Comment" : "Comments"
      }`}</div>
      {chatDetails.comments
        .sort((comment1, comment2) => comment1.id - comment2.id)
        .map((comment) => (
          <Comment
            key={comment.id}
            commentData={comment}
            chatDetails={chatDetails}
            setChatDetails={setChatDetails}
          />
        ))}
    </div>
  );
};

export default Comments;
