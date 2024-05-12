import "../style/EditResponse.scss";

const EditResponse = ({
  edittedResponse,
  setEdittedResponse,
  characterLeft,
  setCharacterLeft,
  handleSubmitEdit,
}) => {
  return (
    <div className="add-edit-container">
      <textarea
        autoFocus
        cols="30"
        rows="10"
        maxLength={250}
        value={edittedResponse}
        onChange={(e) => {
          setCharacterLeft(250 - e.target.value.length);
          setEdittedResponse(e.target.value);
        }}
      />
      <div className="add-edit-footer">
        <div>{characterLeft} character left</div>
        <button onClick={handleSubmitEdit}>Post Edit</button>
      </div>
    </div>
  );
};

export default EditResponse;
