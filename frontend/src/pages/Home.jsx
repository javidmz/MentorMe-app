import SearchBar from "../components/SearchBar";
import Suggestions from "../components/Suggestions";
import Chats from "../components/Chats";
import HomeTags from "../components/HomeTags";
import CreateChat from "../components/CreateChat";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import BgHeaderDesktop from "../assets/suggestions/desktop/background-header.png";
import BgHeaderTablet from "../assets/suggestions/tablet/background-header.png";
import BgHeaderMobile from "../assets/suggestions/mobile/background-header.png";
import "../style/home.scss";
import axios from "axios";
import DataContext from "../contexts/DataContext";
import Pagination from "../components/Pagination";
import useUserInfo from "../hooks/useUserInfo";
import useWindowSize from "../hooks/useWindowSize";

const Home = () => {
  const { userInfo } = useUserInfo();
  const [chatData, setChatData] = useState();
  const [selectedSortType, setSelectedSortType] = useState("Higher Rank");
  const [selectedTag, setSelectedTag] = useState("All");
  const [search, setSearch] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNo = searchParams.get("pageNo");
  const [page, setPage] = useState(Number(pageNo) || 1);
  const [newChat, setNewChat] = useState(false);
  const windowSize = useWindowSize();
  const { tags } = useContext(DataContext);
  const [isMounted, setIsMounted] = useState(false);
  const sortTypeArr = [
    {
      id: 1,
      name: "Most Recent",
      sortByParams: "sortBy=creationDate&direction=DESC",
    },
    {
      id: 2,
      name: "Least Recent",
      sortByParams: "sortBy=creationDate&direction=ASC",
    },
    {
      id: 3,
      name: "Higher Rank",
      sortByParams: "sortBy=rank&direction=DESC",
    },
    {
      id: 4,
      name: "Lower Rank",
      sortByParams: "sortBy=rank&direction=ASC",
    },
  ];

  const getChats = async () => {
    const sortByParams = sortTypeArr.find(
      (type) => type.name === selectedSortType
    ).sortByParams;
    try {
      const response = await axios.get(
        `https://api.mentor-me.xyz/api/v1/chats?${sortByParams}&tag=${selectedTag}&pageNo=${
          page - 1
        }&search=${search}`
      );
      setChatData(response.data.chatList);
      setTotalRecords(response.data.totalRecords);
    } catch (err) {
      if (err?.response?.status === 500) {
        toast.error("Server error. Please, try again later");
      } else if (
        err?.response?.status === 400 ||
        err?.response?.status === 401
      ) {
        toast.error(err.response.errorMessage);
      }
    }
  };

  useEffect(() => {
    document.body.style.overflowY = newChat ? "hidden" : "scroll";
  }, [newChat]);

  useEffect(() => {
    if (isMounted) {
      setPage(1);
      getChats();
    } else {
      setIsMounted(true);
    }
  }, [selectedTag, search]);

  useEffect(() => {
    getChats();
  }, [selectedSortType, page]);

  return (
    <>
      <div className="home">
        <div className="home-header">
          {windowSize > 730 && windowSize < 961 ? (
            <>
              <picture>
                <source media="(min-width: 961px)" srcSet={BgHeaderDesktop} />
                <source media="(min-width: 481px)" srcSet={BgHeaderTablet} />
                <img src={BgHeaderMobile} alt="header_img" loading="lazy" />
              </picture>
              <div className="home-img-ad">
                <div>MentorMe</div>
                <div>Chat Board</div>
              </div>
              <HomeTags
                tags={tags}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
              />
              {userInfo ? (
                <Link to={"/user"}>
                  <div className="logged-user-info">
                    <FaUser />
                    <div className="logged-user-info-details">
                      {userInfo.firstName + " " + userInfo.lastName}
                    </div>
                  </div>
                </Link>
              ) : (
                <Link to="/login" className="login-link">
                  <button>Log in</button>
                </Link>
              )}
            </>
          ) : (
            <>
              <picture>
                <source media="(min-width: 961px)" srcSet={BgHeaderDesktop} />
                <source media="(min-width: 481px)" srcSet={BgHeaderTablet} />
                <img src={BgHeaderMobile} alt="header_img" loading="lazy" />
              </picture>
              <div className="home-img-ad">
                <div>MentorMe</div>
                <div>Chat Board</div>
              </div>
              <HomeTags
                tags={tags}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
              />
            </>
          )}
        </div>
        <div className="home-main">
          <SearchBar search={search} setSearch={setSearch} />
          <Suggestions
            windowSize={windowSize}
            setNewChat={setNewChat}
            sortTypeArr={sortTypeArr}
            selectedSortType={selectedSortType}
            setSelectedSortType={setSelectedSortType}
          />
          {chatData && (
            <Chats
              chatData={chatData}
              sortComparator={selectedSortType}
              selectedTag={selectedTag}
            />
          )}
          <Pagination
            totalRecords={totalRecords}
            page={page}
            setPage={setPage}
          />
        </div>
        {(windowSize > 960 || windowSize < 730) &&
          (userInfo ? (
            <Link to={"/user"}>
              <div className="logged-user-info">
                <FaUser />
                <div className="logged-user-info-details">
                  {userInfo.firstName + " " + userInfo.lastName}
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/login" className="login-link">
              <button>Log in</button>
            </Link>
          ))}
      </div>
      {newChat && tags && <CreateChat tags={tags} setNewChat={setNewChat} />}
    </>
  );
};

export default Home;
