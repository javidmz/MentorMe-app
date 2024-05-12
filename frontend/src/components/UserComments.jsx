import { Link } from "react-router-dom";
import CommentOverview from "./CommentOverview";
import SearchBar from "./SearchBar";
import DropDownMenu from "./DropDownMenu";
import Pagination from "./Pagination";
import "../style/UserComments.scss";

const UserComments = ({
  commentByUser,
  setCommentSearch,
  commentFilter,
  setCommentFilter,
  commentPage,
  setCommentPage,
  sortTypeArr,
}) => {
  return (
    <div className="user-comments-container">
      <SearchBar setSearch={setCommentSearch} />
      <div className="user-comments-dropdown">
        <DropDownMenu
          typesArr={sortTypeArr}
          selectedType={commentFilter}
          setSelectedType={setCommentFilter}
        />
      </div>
      {commentByUser.commentOverviewDTOList.map((comment) => (
        <Link
          key={comment.id}
          to={`/chat/${comment.chatId}/${comment.chatTitle
            .toLowerCase()
            .split(" ")
            .join("-")}`}
        >
          <CommentOverview
            commentContent={comment.commentContent}
            rank={comment.rank}
          />
        </Link>
      ))}
      <Pagination
        totalRecords={commentByUser.totalRecords}
        page={commentPage}
        setPage={setCommentPage}
      />
    </div>
  );
};

export default UserComments;
