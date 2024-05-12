import { useContext, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import DropDownMenu from "./DropDownMenu";
import DeleteVerification from "./DeleteVerification";
import "../style/EditChat.scss";
import toast from "react-hot-toast";
import DataContext from "../contexts/DataContext";
import useUserInfo from "../hooks/useUserInfo";
import { axiosPrivate } from "../api/axios";
import { useNavigate } from "react-router-dom";

const EditChat = ({ setEditChat, chatDetails, setChatDetails }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [title, setTitle] = useState(chatDetails.title);
  const [description, setDescription] = useState(chatDetails.description);
  const [selectedTag, setSelectedTag] = useState();
  const [selectedTags, setSelectedTags] = useState(chatDetails.tags);
  const { tags } = useContext(DataContext);
  const { userInfo } = useUserInfo();
  const editChatRef = useRef();
  const deleteVerCont = useRef();
  const navigate = useNavigate();

  const handleChatUpdate = async () => {
    if (
      chatDetails.title !== title ||
      chatDetails.description !== description ||
      selectedTags.length != chatDetails.tags.length ||
      selectedTags.some(
        (selectedTag) =>
          chatDetails.tags.map((tag) => tag.name).indexOf(selectedTag.name) ===
          -1
      )
    ) {
      const tagIdList = selectedTags.map((tag) => tag.id);

      const updatedChat = {
        title,
        description,
        userId: userInfo.id,
        tagIdList,
      };

      try {
        const response = await axiosPrivate.put(
          `/chat/${chatDetails.id}`,
          updatedChat
        );
        toast.success("Updates are saved");
        setTimeout(() => {
          setChatDetails({
            ...chatDetails,
            title,
            description,
            tags: selectedTags,
          });
          setEditChat(false);
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
    } else {
      toast.error("No Updates");
    }
  };

  const handleChatDelete = async () => {
    try {
      const response = axiosPrivate.delete(`/chat/${chatDetails.id}`);
      setIsDelete(false);
      toast.success("Chat is deleted.");
      setTimeout(() => {
        navigate("/home", { replace: true });
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
      if (
        editChatRef.current &&
        !editChatRef.current.contains(e.target) &&
        !deleteVerCont.current
      )
        setEditChat(false);
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

  useEffect(() => {
    document.body.style.overflowY = isDelete ? "hidden" : "scroll";
  }, [isDelete]);

  return (
    <>
      {tags && (
        <div
          className={`edit-chat-container ${!isDelete ? "passive" : ""}`}
          ref={editChatRef}
        >
          <div className="edit-chat-header">Editing '{chatDetails.title}'</div>
          <div className="edit-content">
            <div className="edit-content-title">
              <div>Chat Title</div>
              <div>Add a short, descriptive headline</div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={
                  title.length < 5 || title.length > 100 ? "error" : ""
                }
              />
              {title.length < 5 && (
                <div className="error-message">
                  <IoMdInformationCircleOutline /> Title should contain at least
                  5 characters{" "}
                </div>
              )}
              {title.length > 100 && (
                <div className="error-message">
                  <IoMdInformationCircleOutline /> Title should contain less
                  than 100 characters{" "}
                </div>
              )}
            </div>
            <div className="edit-content-category">
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
              {selectedTags.length === 0 ? (
                <div className="error-message">
                  <IoMdInformationCircleOutline /> You should select at least 1
                  category
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="edit-content-detail">
              <div>Chat Detail</div>
              <div>Include any specific comments on your chat</div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={
                  description.length < 10 || description.length > 250
                    ? "error"
                    : ""
                }
              />
              {description.length < 10 && (
                <div className="error-message">
                  <IoMdInformationCircleOutline /> Description should contain at
                  least 10 characters{" "}
                </div>
              )}
              {description.length > 250 && (
                <div className="error-message">
                  <IoMdInformationCircleOutline /> Description should contain
                  less than 250 characters{" "}
                </div>
              )}
            </div>
          </div>
          <div className="edit-chat-footer">
            <button onClick={() => setIsDelete(true)}>Delete</button>
            <div>
              <button onClick={() => setEditChat(false)}>Cancel</button>
              <button
                disabled={
                  title.length < 5 ||
                  title.length > 100 ||
                  description.length < 10 ||
                  description.length > 250 ||
                  selectedTags.length === 0
                }
                onClick={handleChatUpdate}
              >
                Update Chat
              </button>
            </div>
          </div>
        </div>
      )}
      {isDelete && (
        <DeleteVerification
          id={chatDetails.id}
          deleteVerCont={deleteVerCont}
          setIsDelete={setIsDelete}
          type="chat"
          deleteFunc={handleChatDelete}
        />
      )}
    </>
  );
};

export default EditChat;
