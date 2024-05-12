import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../style/Pagination.scss";
import { useEffect } from "react";

const Pagination = ({ totalRecords, page, setPage }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      {totalRecords !== 0 ? (
        <div className="pagination">
          <button
            onClick={() => {
              setPage(page - 1);
              navigate({ search: `?pageNo=${page - 1}` });
            }}
            disabled={page <= 1}
          >
            <FaArrowLeft /> Previous
          </button>
          <div>
            {page} of {Math.ceil(totalRecords / 5)}
          </div>
          <button
            onClick={() => {
              setPage(page + 1);
              navigate({ search: `?pageNo=${page + 1}` });
            }}
            disabled={page >= totalRecords / 5}
          >
            Next <FaArrowRight />
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Pagination;
