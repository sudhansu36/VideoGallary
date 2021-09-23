import React from "react";
import { useContext } from "react";
import LoadingBar from "react-top-loading-bar";
import LoadingContext from "../../context/toploadingbar/LoadingContext";
const Loadingbar = () => {
  const { progress } = useContext(LoadingContext);
  return <LoadingBar height={3} color="#f11946" progress={progress} />;
};
export default Loadingbar;
