import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <form className="d-flex me-5" onSubmit={submitHandler}>
      <input
        className="form-control me-2 p-3 fs-3"
        type="text"
        placeholder="Search Products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        aria-label="Search product"
      />
      <button className="btn btn-outline-success me-5 p-3" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
