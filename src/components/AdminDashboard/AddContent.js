import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addContent } from "../../store/contentSlice";
import { useDispatch } from "react-redux";
import LoadingContext from "../../context/toploadingbar/LoadingContext";
import ContentForm from "./ContentForm";
const AddContent = () => {
  let dispatch = useDispatch();
  const { setProgress } = useContext(LoadingContext);
  let history = useHistory();
  let [file, setFile] = useState(null);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onContentSelect = (e) => {
    setFile(e.target.files[0]);
  };
  // Add Content Function
  const onAddContentSubmit = async (contentObj) => {
    setProgress(30);
    let formData = new FormData();
    formData.append("photo", file, file.name);
    formData.append("contentObj", JSON.stringify(contentObj));
    setProgress(60);
    dispatch(addContent(formData));
    setProgress(90);
    alert("New Content Added");
    history.goBack();
    setProgress(100);
  };
  return (
    <div className="mt-5 container">
      <div className="row">
        {/* Content Form */}
        <ContentForm
          register={register}
          type="Add"
          handleSubmit={handleSubmit}
          onContentSelect={onContentSelect}
          onContentSubmit={onAddContentSubmit}
          errors={errors}
        />
      </div>
    </div>
  );
};
export default AddContent;
