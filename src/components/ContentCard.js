import React from "react";

const ContentCard = (props) => {
  return (
    <div className="col" key={props.key}>
      <div className="card h-100 bg-transparent text-light">
        <img src={props.obj.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.obj.mname}</h5>
          <p className="card-text text-truncate">{props.obj.mdesc}</p>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
