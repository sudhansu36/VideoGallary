import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
const TypeCard = (props) => {
  let { url } = useRouteMatch();
  let history = useHistory();
  let Color = [
    "#513b66",
    "#48527b",
    "#3e4c44",
    "#593548",
    "#404067",
    "#3f3a52",
    "#333c33",
    "#083d3f",
    "#110e0e",
    "#590101",
    "	#504356",
    "#504854",
    "#111111",
  ];
  async function showResult(obj) {
    history.push(`/result/${props.title}/${obj}`);
  }

  return (
    <div className="fluid-container py-2 mx-3">
      <h3 className="text-light fw-bold py-0 px-2">{props.title}</h3>
      <div className="d-flex flex-row flex-nowrap overflow-auto row row-cols-3 row-cols-md-6  row-cols-lg-8 scoll-pane m-0 py-2">
        {props.collection.map((obj, key) => {
          return (
            <div
              className="btn d-flex text-light mx-2 align-items-center justify-content-center "
              style={{
                backgroundColor:
                  Color[Math.floor(Math.random() * Color.length)],
                minHeight: "100px",
              }}
              key={key}
              onClick={() => showResult(obj)}
            >
              <h4 className="py-0 m-0 px-2">{obj}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TypeCard;
