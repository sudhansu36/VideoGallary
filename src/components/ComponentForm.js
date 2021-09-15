import React from "react";

const ComponentForm = ({
  register,
  handleSubmit,
  onContentSubmit,
  errors,
  onContentSelect,
  type,
}) => {
  let genres = [
    "Action",
    "Horror",
    "Crime",
    "Romance",
    "Drama",
    "Science fiction",
    "Comedy",
    "Thriller",
    "Adventure",
    "Biographical",
    "Fantasy",
    "Anime",
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
  return (
    <form
      className="col-11 col-sm-8 col-md-6 mx-auto"
      onSubmit={handleSubmit(onContentSubmit)}
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
        <label className="form-check-label text-light" htmlFor="movie">
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
          <label className="text-danger">* Movie Description is Required</label>
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
          required
          accept="image/*"
        />
      </div>
      <button className="btn btn-primary mx-auto d-block text-light mb-3">
        {type}
      </button>
    </form>
  );
};

export default ComponentForm;
