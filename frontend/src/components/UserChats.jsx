import Chat from "./Chat";
import DropDownMenu from "./DropDownMenu";
import SearchBar from "./SearchBar";
import "../style/UserChats.scss";
import Pagination from "./Pagination";

const UserChats = ({
  chatByUser,
  setChatSearch,
  chatFilter,
  setChatFilter,
  chatPage,
  setChatPage,
  sortTypeArr,
}) => {
  return (
    <div className="user-chats-container">
      <SearchBar setSearch={setChatSearch} />
      <div className="user-chats-dropdown">
        <DropDownMenu
          typesArr={sortTypeArr}
          selectedType={chatFilter}
          setSelectedType={setChatFilter}
        />
      </div>
      {chatByUser.chatOverviewDTOList.map((chat) => (
        <div className="chat-holder" key={chat.id}>
          <Chat chatInfo={chat} />
        </div>
      ))}
      <Pagination
        totalRecords={chatByUser.totalRecords}
        page={chatPage}
        setPage={setChatPage}
      />
    </div>
  );
};

export default UserChats;
