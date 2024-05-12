import "../style/ReplyOverview.scss";

const ReplyOverview = ({ replyContent, rank }) => {
  return (
    <div className="reply-overview-container">
      <div className="rank">{rank}</div>
      <div>{replyContent}</div>
    </div>
  );
};

export default ReplyOverview;
