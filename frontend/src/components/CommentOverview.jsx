import "../style/CommentOverview.scss";

const CommentOverview = ({ commentContent, rank }) => {
  return (
    <div className="comment-overview-container">
      <div className="rank">{rank}</div>
      <div>{commentContent}</div>
    </div>
  );
};

export default CommentOverview;
