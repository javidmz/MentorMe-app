import "../style/HomeTags.scss";

const HomeTags = ({ tags, selectedTag, setSelectedTag }) => {
  return (
    <div className="home-tags">
      {tags &&
        tags.map((tag) => (
          <div
            key={tag.id}
            className={`home-tag ${tag.name === selectedTag ? "selected" : ""}`}
            onClick={() => setSelectedTag(tag.name)}
          >
            {tag.name}
          </div>
        ))}
    </div>
  );
};

export default HomeTags;
