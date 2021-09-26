import React, { useState ,useContext} from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams} from "react-router-dom";
import { editContent } from "../../store/contentSlice";
import ContentForm from "./ContentForm";
import LoadingContext from "../../context/toploadingbar/LoadingContext";
const EditContent = () => {
  const { setProgress } = useContext(LoadingContext);
  let dispatch = useDispatch();
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
  // Edit contet function
  function onEditContentSubmit(contentObj) {
    setProgress(30);
    let index = contentCollection.findIndex(
      (obj) => obj._id === contentObj._id
    );
    let formData = new FormData();
    setProgress(60);
    formData.append("photo", file, file.name);
    formData.append("contentObj", JSON.stringify(contentObj));
    dispatch(editContent({ index: index, formData: formData }));
    setProgress(100);
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
        {/* From */}
        <ContentForm
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

export default EditContent;
