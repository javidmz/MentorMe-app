import { IoMdInformationCircleOutline } from "react-icons/io";
import "../style/CreateChat.scss";
import { useEffect, useRef, useState } from "react";
import DropDownMenu from "./DropDownMenu";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useUserInfo from "../hooks/useUserInfo";
import { useNavigate } from "react-router-dom";

const CreateChat = ({ tags, setNewChat }) => {
  const createChatRef = useRef();
  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [selectedTag, setSelectedTag] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const { userInfo } = useUserInfo();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleChatCreate = async (e) => {
    e.preventDefault();
    const tagIdList = selectedTags.map((tag) => tag.id);
    const newChat = {
      title,
      description,
      userId: userInfo.id,
      tagIdList,
    };

    try {
      const response = await axiosPrivate.post("/chats", newChat);
      toast.success("New Chat created");
      setTimeout(() => {
        setNewChat(false);
        navigate(
          `/chat/${response.data.id}/${response.data.title
            .toLowerCase()
            .split(" ")
            .join("-")}`
        );
      }, 2000);
    } catch (err) {
      if (err?.response?.status === 500) {
        toast.error("Server error. Please, try again later");
      } else if (
        err?.response?.status === 400 ||
        err?.response?.status === 401
      ) {
        toast.error(err.response.data.message);
      }
    }
  };

  const removeSelectedTag = (id) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id != id));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!createChatRef.current.contains(e.target)) setNewChat(false);
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (
      selectedTag &&
      !selectedTags.map((tag) => tag.name).includes(selectedTag)
    ) {
      const tagObj = tags.find((tag) => tag.name === selectedTag);
      setSelectedTags([...selectedTags, tagObj]);
    }
  }, [selectedTag]);

  return (
    <>
      <div className="create-chat-container" ref={createChatRef}>
        <div className="create-chat-header">Create New Chat</div>
        <div className="create-content">
          <div className="create-content-title">
            <div>Chat Title</div>
            <div>Add a short, descriptive headline</div>
            <input
              type="text"
              value={title}
              onBlur={() => setTitleErr(true)}
              onFocus={() => setTitleErr(false)}
              onChange={(e) => setTitle(e.target.value)}
            />
            {titleErr && title.length < 5 && (
              <div className="error-message">
                <IoMdInformationCircleOutline /> Title should contain at least 5
                characters{" "}
              </div>
            )}
            {titleErr && title.length > 100 && (
              <div className="error-message">
                <IoMdInformationCircleOutline /> Title should contain less than
                100 characters{" "}
              </div>
            )}
          </div>
          <div className="create-content-category">
            <div>Category</div>
            <div>Choose a category for your chat</div>
            <div className="selected-tags-container">
              {selectedTags.map((tag) => (
                <div key={tag.id} className="view-tag">
                  <div>{tag.name}</div>
                  <IoClose onClick={() => removeSelectedTag(tag.id)} />
                </div>
              ))}
            </div>
            <DropDownMenu
              typesArr={tags.filter(
                (tag) =>
                  !selectedTags
                    .map((selectedTag) => selectedTag.name)
                    .includes(tag.name) && tag.name !== "All"
              )}
              selectedType={""}
              setSelectedType={setSelectedTag}
            />
          </div>
          <div className="create-content-detail">
            <div>Chat Detail</div>
            <div>Include any specific comments on your chat</div>
            <textarea
              value={description}
              onBlur={() => setDescriptionErr(true)}
              onFocus={() => setDescriptionErr(false)}
              onChange={(e) => setDescription(e.target.value)}
            />
            {descriptionErr && description.length < 10 && (
              <div className="error-message">
                <IoMdInformationCircleOutline /> Description should contain at
                least 10 characters{" "}
              </div>
            )}
            {descriptionErr && description.length > 250 && (
              <div className="error-message">
                <IoMdInformationCircleOutline /> Description should contain less
                than 250 characters{" "}
              </div>
            )}
          </div>
        </div>
        <div className="create-chat-footer">
          <button onClick={() => setNewChat(false)}>Cancel</button>
          <button onClick={handleChatCreate}>Create Chat</button>
        </div>
      </div>
    </>
  );
};

export default CreateChat;
