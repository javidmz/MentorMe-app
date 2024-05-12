import { Link } from "react-router-dom";
import ReplyOverview from "./ReplyOverview";
import DropDownMenu from "./DropDownMenu";
import SearchBar from "./SearchBar";
import "../style/UserReplies.scss";
import Pagination from "./Pagination";

const UserReplies = ({
  replyByUser,
  setReplySearch,
  replyFilter,
  setReplyFilter,
  replyPage,
  setReplyPage,
  sortTypeArr,
}) => {
  return (
    <div className="user-replies-container">
      <SearchBar setSearch={setReplySearch} />
      <div className="user-replies-dropdown">
        <DropDownMenu
          typesArr={sortTypeArr}
          selectedType={replyFilter}
          setSelectedType={setReplyFilter}
        />
      </div>
      {replyByUser.replyOverviewDTOList.map((reply) => (
        <Link
          key={reply.id}
          to={`/chat/${reply.chatId}/${reply.chatTitle
            .toLowerCase()
            .split(" ")
            .join("-")}`}
        >
          <ReplyOverview replyContent={reply.replyContent} rank={reply.rank} />
        </Link>
      ))}
      <Pagination
        totalRecords={replyByUser.totalRecords}
        page={replyPage}
        setPage={setReplyPage}
      />
    </div>
  );
};

export default UserReplies;
