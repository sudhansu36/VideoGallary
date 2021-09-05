import React, { useState } from "react";
import LoadingContext from "./LoadingContext";
const LoadingState = (props) => {
  const [progress, setProgress] = useState(0);
  return (
    <LoadingContext.Provider value={{ progress, setProgress }}>
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingState;
