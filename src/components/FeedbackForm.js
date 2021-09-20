import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingContext from "../context/toploadingbar/LoadingContext";

const FeedbackForm = () => {
  const { setProgress } = useContext(LoadingContext);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onFeedbackSubmit = async (feedback) => {
    setProgress(35);
    let response = await axios.post("/comment/sendfeedback", feedback);
    setProgress(75);
    let data = response.data;
    if (data.message === "feedback submited") {
      alert("Feedback Sended Successfully");
    } else {
      alert("Something went wrong");
    }
    setProgress(100);
  };
  return (
    <div className="container mt-5">
      <form
        className="col-10 col-sm-8 col-md-6 mx-auto"
        onSubmit={handleSubmit(onFeedbackSubmit)}
      >
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            {...register("email", { required: true })}
          />
          <label htmlFor="email">Email address</label>
        </div>
        {errors.email?.type === "required" && (
          <p className="alert alert-danger p-1">* Email is Required</p>
        )}
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "200px" }}
            {...register("comment", { required: true })}
          ></textarea>
          <label htmlFor="floatingTextarea2">Comments/FeedBack/Complaint</label>
        </div>
        {errors.comment?.type === "required" && (
          <p className="alert alert-danger p-1">
            * Comments/FeedBack/Complaint is Required
          </p>
        )}
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
