import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Zoom from "react-reveal/Zoom";
import { addToWatchList, deleteFromWatchList } from "../store/watchlistSlice";
import { deleteContent } from "../store/contentSlice";
const ContentCard = (props) => {
  let history = useHistory();
  let dispatch = useDispatch();
  let { userObj } = useSelector((state) => state.user);
  let { isAdmin, email } = userObj;
  function moviePreview(movie) {
    history.push(`/result/${movie._id}`);
  }
  let { watchList } = useSelector((state) => state.watchlist);
  function isPresent(mname) {
    let list = watchList.find((obj) => obj.mname === mname);
    return list;
  }
  const [isShown, setIsShown] = useState(false);
  return (
    <div className="col" key={props.key}>
      <div
        className="card h-100 bg-transparent text-light p-0 border-0 poster"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <img
          src={props.obj.image}
          className="card-img-top btn"
          alt="..."
          onClick={() => moviePreview(props.obj)}
        />
        <Zoom top collapse when={isShown}>
          <div className="card-body">
            <div className="my-2">
              {isAdmin ? (
                <div className="d-flex justify-content-between mx-2">
                  <i class="far fa-edit"></i>
                  <i
                    class="fas fa-trash"
                    onClick={() =>
                      dispatch(deleteContent({ mname: props.obj.mname }))
                    }
                  ></i>
                </div>
              ) : (
                <div className="d-flex justify-content-between mx-2">
                  <i className="far fa-play-circle"></i>
                  <div>
                    <i className="fas fa-heart px-1"></i>
                    {isPresent(props.obj.mname) === undefined ? (
                      <i
                        className="fas fa-plus px-1"
                        onClick={() =>
                          dispatch(
                            addToWatchList({ email: email, content: props.obj })
                          )
                        }
                      ></i>
                    ) : (
                      <i
                        class="fas fa-minus px-1"
                        onClick={() =>
                          dispatch(
                            deleteFromWatchList({
                              email: email,
                              content: props.obj,
                            })
                          )
                        }
                      ></i>
                    )}
                  </div>
                </div>
              )}
            </div>
            <h5 className="card-title">{props.obj.mname}</h5>
            <p className="card-text text-truncate">{props.obj.mdesc}</p>
          </div>
        </Zoom>
      </div>
    </div>
  );
};

export default ContentCard;
