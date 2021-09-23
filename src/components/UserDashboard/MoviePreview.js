import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  addToWatchList,
  deleteFromWatchList,
} from "../../store/watchlistSlice";
import { addToFavorite, deleteFromFavourite } from "../../store/favouriteSlice";
import { deleteContent } from "../../store/contentSlice";
import Recommendations from "./Recommendations";
const MoviePreview = () => {
  let { contentCollection, isSucess } = useSelector(
    (state) => state.contentCollection
  );
  let { userObj } = useSelector((state) => state.user);
  let { isAdmin, email } = userObj;
  let history = useHistory();
  let dispatch = useDispatch();
  let [state, setState] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    let value = contentCollection.find((value) => value._id === id);
    setState(value);
    // eslint-disable-next-line
  }, [isSucess, id]);
  let { watchList } = useSelector((state) => state.watchlist);
  let { favourite } = useSelector((state) => state.favourite);
  function isPresent(mid) {
    let list = watchList.find((id) => id === mid);
    return list;
  }
  function isFavourite(mid) {
    let list = favourite.find((id) => id === mid);
    return list;
  }
  return (
    <div>
      {state && (
        <div
          className="banner"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${state.image})`,
            backgroundPosition: "top",
          }}
        >
          <div className="text-light pb-5 px-3 d-flex flex-column justify-content-end banner_content">
            <h1 className="pb-0">{state?.mname}</h1>
            <p>{state.rdate}</p>
            <p>{state?.mdesc}</p>
            <div>
              {state.genres.map((genre, index) => {
                return (
                  <button
                    className="px-2 me-2 my-2 btn btn-dark text-light"
                    key={index}
                    onClick={() => history.push(`/result/Genres/${genre}`)}
                  >
                    {genre}
                  </button>
                );
              })}
            </div>
            <div className="mt-5">
              {isAdmin ? (
                <div className="d-flex justify-content-between mx-2">
                  {/* Edit */}
                  <i
                    className="far fa-edit fs-2"
                    onClick={() => history.push(`/editcontent/${state._id}`)}
                  ></i>
                  {/* Play */}
                  <i
                    className="far fa-play-circle fs-2"
                    onClick={() => history.push("/playvideo")}
                  ></i>
                  {/* Delete */}
                  <i
                    className="fas fa-trash fs-2"
                    onClick={() =>
                      dispatch(deleteContent({ mname: state.mname }))
                    }
                  ></i>
                </div>
              ) : (
                <div className="d-flex justify-content-between mx-2">
                  {/* Play */}
                  <i
                    className="far fa-play-circle fs-2"
                    onClick={() => history.push("/playvideo")}
                  ></i>
                  <div>
                    {/* Favourite */}
                    {isFavourite(state._id) === undefined ? (
                      <i
                        className="fas fa-heart px-2 fs-2"
                        onClick={() =>
                          dispatch(
                            addToFavorite({ email: email, id: state._id })
                          )
                        }
                      ></i>
                    ) : (
                      <i
                        className="fas fa-heart px-2 fs-2 text-danger"
                        onClick={() =>
                          dispatch(
                            deleteFromFavourite({
                              email: email,
                              id: state._id,
                            })
                          )
                        }
                      ></i>
                    )}
                    {/* Watchlist */}
                    {isPresent(state._id) === undefined ? (
                      <i
                        className="fas fa-plus px-2 fs-2"
                        onClick={() =>
                          dispatch(
                            addToWatchList({ email: email, id: state._id })
                          )
                        }
                      ></i>
                    ) : (
                      <i
                        className="fas fa-minus px-2 fs-2"
                        onClick={() =>
                          dispatch(
                            deleteFromWatchList({
                              email: email,
                              id: state._id,
                            })
                          )
                        }
                      ></i>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {state && <Recommendations genres={state.genres} />}
    </div>
  );
};

export default MoviePreview;
