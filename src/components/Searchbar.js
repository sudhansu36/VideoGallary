import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { useHistory } from "react-router";
const Searchbar = () => {
  let history = useHistory();
  let { contentCollection } = useSelector((state) => state.contentCollection);
  let { register, handleSubmit } = useForm();
  function onSearch(search) {
    let filteredData = contentCollection.filter((value) => {
      return value.mname
        .toLowerCase()
        .includes(search.searchItem.toLowerCase());
    });
    history.push({ pathname: "/searchresult", state: filteredData });
  }
  return (
    <form className="d-flex" onSubmit={handleSubmit(onSearch)}>
      <input
        className="form-control me-1 noshadow"
        type="search"
        placeholder="Search"
        aria-label="Search"
        {...register("searchItem", { required: true })}
      />
      <button className="btn p-0 text-light" type="submit">
        <i className="fas fa-search my-auto"></i>
      </button>
    </form>
  );
};

export default Searchbar;
