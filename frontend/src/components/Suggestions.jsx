import Suggestion from "../assets/suggestions/icon-suggestions.svg";
import DropDownMenu from "./DropDownMenu";
import "../style/suggestions.scss";
import useUserInfo from "../hooks/useUserInfo";

const Suggestions = ({
  windowSize,
  setNewChat,
  selectedSortType,
  setSelectedSortType,
  sortTypeArr,
}) => {
  const { userInfo } = useUserInfo();

  return (
    <div className={`suggestion-container ${userInfo ? "logged" : ""}`}>
      {userInfo ? (
        <div className="suggestion-info">
          {windowSize > 481 && <img src={Suggestion} alt="suggestion" />}
          <div className="suggestion-sort-container">
            <div>Sort by :</div>
            <DropDownMenu
              typesArr={sortTypeArr}
              selectedType={selectedSortType}
              setSelectedType={setSelectedSortType}
            />
          </div>
        </div>
      ) : (
        <>
          {windowSize > 481 && <img src={Suggestion} alt="suggestion" />}
          <div className="suggestion-sort-container">
            <div>Sort by :</div>
            <DropDownMenu
              typesArr={sortTypeArr}
              selectedType={selectedSortType}
              setSelectedType={setSelectedSortType}
            />
          </div>
        </>
      )}
      {userInfo && (
        <button className="suggestion-btn" onClick={() => setNewChat(true)}>
          + Add New Chat
        </button>
      )}
    </div>
  );
};

export default Suggestions;
