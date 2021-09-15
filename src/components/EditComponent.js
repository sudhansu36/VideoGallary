import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editContent } from "../store/contentSlice";
import ComponentForm from "./ComponentForm";
const EditComponent = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  let { contentCollection } = useSelector((state) => state.contentCollection);
  let { mid } = useParams();
  let value = contentCollection.find((value) => value._id === mid);
  let [file, setFile] = useState(null);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: value });
  const onContentSelect = (e) => {
    setFile(e.target.files[0]);
  };
  function onEditContentSubmit(contentObj) {
    let index = contentCollection.findIndex(
      (obj) => obj._id === contentObj._id
    );
    let formData = new FormData();
    formData.append("photo", file, file.name);
    formData.append("contentObj", JSON.stringify(contentObj));
    dispatch(editContent({ index: index, formData: formData }));
    alert("Content Updated");
    history.goBack();
  }
  return (
    <div
      className="fluid"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${value?.image})`,
        backgroundPosition: "top",
      }}
    >
      <div
        className="row pt-5 mx-auto"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        <ComponentForm
          register={register}
          type="Update"
          handleSubmit={handleSubmit}
          onContentSelect={onContentSelect}
          onContentSubmit={onEditContentSubmit}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default EditComponent;
