import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
const Login = (props) => {
  let history = useHistory();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function onLoginFormSubmit(userObj) {
    console.log(userObj);
    history.push("/userdashboard");
  }
  return (
    <div
      className="modal fade"
      id="login"
      tabIndex="-1"
      aria-labelledby="ModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ModalLabel">
              LOGIN
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onLoginFormSubmit)}>
              <div className="form-check form-switch">
                <label className="form-check-label me-2" htmlFor="usertype">
                  User/Admin (*Switch it on if you are admin..)
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="usertype"
                  {...register("type")}
                />
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="Lemail"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" ? (
                  <label className="text-danger">* Email is Required</label>
                ) : (
                  <label htmlFor="Lemail">Email</label>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="Lpassword"
                  placeholder="Password"
                  autoComplete="on"
                  {...register("password", { required: true })}
                />
                {errors.password?.type === "required" ? (
                  <label className="text-danger">* Password is Required</label>
                ) : (
                  <label htmlFor="Lpassword">Password</label>
                )}
              </div>

              <button className="btn btn-success mx-auto mb-3 d-block">
                SIGN IN{" "}
                <img
                  src="https://img.icons8.com/material-sharp/24/ffffff/login-rounded.png"
                  alt=""
                />
              </button>
            </form>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <p className="text-dark">New User..</p>
            <button
              type="button"
              className="btn btn-warning btn-sm text-light"
              data-bs-toggle="modal"
              data-bs-target="#register"
              onClick={props.setRModal(true)}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
