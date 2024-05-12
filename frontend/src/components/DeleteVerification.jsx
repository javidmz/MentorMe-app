import { FaTrashAlt } from "react-icons/fa";
import "../style/DeleteVerification.scss";
import { useEffect } from "react";

const DeleteVerification = ({
  deleteVerCont,
  setIsDelete,
  type,
  deleteFunc,
}) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (deleteVerCont.current && !deleteVerCont.current.contains(e.target))
        setIsDelete(false);
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={deleteVerCont} className="delete-ver-container">
      <div className="trash-can">
        <FaTrashAlt />
      </div>
      <div className="delete-ver-header">Are you sure?</div>
      <div>
        {type === "user"
          ? "This account will be deleted permanently"
          : "This chat will be deleted permanently and nobody will be able to view it again."}
      </div>
      <div className="delete-ver-footer">
        <button onClick={() => setIsDelete(false)}>Cancel</button>
        <button onClick={deleteFunc}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteVerification;
