import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Modal } from "react-bootstrap";
import LoadingContext from "../context/toploadingbar/LoadingContext";
const Register = (props) => {
  const { setProgress } = useContext(LoadingContext);
  let [userRegistrationStatus, setUserRegistrationStatus] = useState("");
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [file, setFile] = useState(null);
  const onRegisterFormSubmit = async (userObj) => {
    setProgress(10);
    let formData = new FormData();
    formData.append("photo", file, file.name);
    formData.append("userObj", JSON.stringify(userObj));
    setProgress(20);
    let responseObj = await axios.post("/users/register", formData);
    setProgress(60);
    let payload = responseObj.data;
    if (payload.message === "User Registered Successfully") {
      props.setRModal(false);
      props.setLModal(true);
    } else {
      setUserRegistrationStatus("Email has Already Register");
    }
    setProgress(100);
  };
  const onDpSelect = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <Modal show={props.rmodal} centered onHide={() => props.setRModal(false)}>
      <Modal.Header >
        <h5>
          REGISTER{" "}
          <span className="text-danger text-center">
            *{userRegistrationStatus}
          </span>
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => props.setRModal(false)}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onRegisterFormSubmit)}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" ? (
              <label className="text-danger">* Name is Required</label>
            ) : (
              <label htmlFor="name">Name</label>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" ? (
              <label className="text-danger">* Email is Required</label>
            ) : (
              <label htmlFor="email">Email</label>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="pic">Profile Picture</label>
            <input
              type="file"
              className="form-control"
              id="pic"
              onChange={onDpSelect}
              placeholder="Product Picture"
            />
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              autoComplete="on"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" ? (
              <label className="text-danger">* Password is Required</label>
            ) : (
              <label htmlFor="password">Password</label>
            )}
          </div>
          <button className="btn btn-warning mx-auto d-block text-light">
            SIGN UP{" "}
            <img
              src="https://img.icons8.com/material-sharp/24/ffffff/login-rounded.png"
              alt=""
            />
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <p className="text-dark">Already a Member...</p>
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={() => {
            props.setLModal(true);
            props.setRModal(false);
          }}
        >
          SIGN IN
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default Register;
