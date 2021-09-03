import React, { useState } from "react";
import { useForm } from "react-hook-form";
const Register = () => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [file, setFile] = useState(null);
  const onRegisterFormSubmit = async (userObj) => {
    console.log(userObj);
    let formData = new FormData();
    formData.append("photo", file, file.name);
    formData.append("userObj", JSON.stringify(userObj));
  };
  const onDpSelect = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div
      className="modal fade"
      id="register"
      tabIndex="-1"
      aria-labelledby="ModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ModalLabel">
              REGISTER
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
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
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <p className="text-dark">Already a Member...</p>
            <button
              type="button"
              className="btn btn-success btn-sm"
              data-bs-dismiss="modal"
            >
              SIGN IN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
