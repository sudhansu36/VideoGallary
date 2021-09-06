import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import getAxiosWithTokenObj from "../AuthorizedRequest/AxiosReqWithToken";
import { useForm } from "react-hook-form";
const AddContent = () => {
  let axiosReqWithToken = getAxiosWithTokenObj();
  let history = useHistory();
  let [file, setFile] = useState(null);
  let genres = [
    "Action",
    "Horror",
    "Crime",
    "Romanse",
    "Drama",
    "Science fiction",
    "Comedy",
    "Thriller",
    "Adventure",
    "Biographical",
    "Fantasy",
  ];
  let languages = [
    "English",
    "Hindi",
    "Telugu",
    "Tamil",
    "Kannada",
    "Malayalam",
    "Bengali",
    "Panjabi",
    "Marathi",
  ];
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onContentSelect = (e) => {
    setFile(e.target.files[0]);
  };
  const onAddContentSubmit = async (contentObj) => {
    let formData = new FormData();
    formData.append("photo", file, file.name);
    formData.append("contentObj", JSON.stringify(contentObj));
    let response = await axiosReqWithToken.post(
      "/content/addcontent",
      formData
    );
    if (response.data.message === "New Content Created") {
      alert(response.data.message);
      history.goBack();
    } else {
      alert(response.data.message);
    }
  };
  return (
    <div className="mt-5 container">
      <div className="row">
        <form
          className="col-11 col-sm-8 col-md-6 mx-auto"
          onSubmit={handleSubmit(onAddContentSubmit)}
        >
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="mname"
              placeholder="Movie Name"
              {...register("mname", { required: true })}
            />
            {errors.mname?.type === "required" ? (
              <label className="text-danger">* Movie Name is Required</label>
            ) : (
              <label htmlFor="mname">Movie Name</label>
            )}
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="movies"
              id="movie"
              value="movie"
              {...register("category", { required: true })}
            />
            <label
              className="form-check-label text-light"
              htmlFor="inlineRadio1"
            >
              Movie
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="tvseries"
              id="series"
              value="series"
              {...register("category", { required: true })}
            />
            <label className="form-check-label text-light" htmlFor="series">
              Tv Show
            </label>
          </div>
          {errors.category?.type === "required" && (
            <p className="text-danger">* Movie Category is Required</p>
          )}
          <div className="form-floating my-3">
            <textarea
              className="form-control"
              placeholder="Movie Description"
              id="mdesc"
              {...register("mdesc", { required: true })}
            ></textarea>
            {errors.mdesc?.type === "required" ? (
              <label className="text-danger">
                * Movie Description is Required
              </label>
            ) : (
              <label htmlFor="mdesc">Movie Description</label>
            )}
          </div>
          <p className="text-light m-0">Genres</p>
          {genres.map((genre, index) => {
            return (
              <div className="d-inline" key={index}>
                <input
                  type="checkbox"
                  className="btn-check btn-check-inline"
                  id={genre}
                  autoComplete="off"
                  value={genre}
                  {...register("genres", { required: true })}
                />
                <label
                  className="btn btn-outline-info noshadow me-2 mb-3 border-0 "
                  htmlFor={genre}
                >
                  {genre}
                </label>
              </div>
            );
          })}
          {errors.genres?.type === "required" && (
            <p className="text-danger">* Movie Genre is Required</p>
          )}
          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control"
              id="rdate"
              placeholder="Release Date"
              {...register("rdate", { required: true })}
            />
            {errors.rdate?.type === "required" ? (
              <label className="text-danger">* Release Date is Required</label>
            ) : (
              <label htmlFor="rdate">Release Date</label>
            )}
          </div>
          <p className="text-light m-0">Languages</p>
          {languages.map((language, index) => {
            return (
              <div className="d-inline" key={index}>
                <input
                  type="checkbox"
                  className="btn-check btn-check-inline"
                  id={language}
                  autoComplete="off"
                  value={language}
                  {...register("languages", { required: true })}
                />
                <label
                  className="btn btn-outline-secondary noshadow me-2 mb-3 border-0 "
                  htmlFor={language}
                >
                  {language}
                </label>
              </div>
            );
          })}
          {errors.languages?.type === "required" && (
            <p className="text-danger">* Movie Language is Required</p>
          )}
          <div className="mb-3">
            <label htmlFor="mpic" className="text-light">
              Movie Picture
            </label>
            <input
              type="file"
              className="form-control"
              id="mpic"
              placeholder="Product Picture"
              onChange={onContentSelect}
            />
          </div>
          <button className="btn btn-primary mx-auto d-block text-light mb-3">
            Add Content
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContent;
