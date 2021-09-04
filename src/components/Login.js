import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogin, clearLoginState } from "../store/userSlice";
const Login = (props) => {
  let history = useHistory();
  let { userObj, isSuccess,invalidLoginMessage } = useSelector((state) => state.user);
  let dispatch = useDispatch(clearLoginState);
  let [userCredentialObj, setUserCredentialObj] = useState({
    type: "",
    email: "",
    password: "",
  });
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function onLoginFormSubmit(userObj) {
    props.setProgress(10);
    setUserCredentialObj({ ...userObj });
    props.setProgress(50);
    dispatch(userLogin(userObj));
    props.setProgress(100);
  }
  useEffect(() => {
    if (isSuccess === true && userCredentialObj.type === false) {
      history.push(`/userdashboard/${userObj.name}`);
    }
    if (isSuccess === true && userCredentialObj.type === true) {
      console.log(userObj);
      history.push(`/admindashboard/${userObj.name}`);
    }
  }, [isSuccess, userCredentialObj]);
  return (
    !isSuccess && (
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
                LOGIN {" "}
                <span className="text-danger text-center">
                  *{invalidLoginMessage}
                </span>
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
                    <label className="text-danger">
                      * Password is Required
                    </label>
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
    )
  );
};

export default Login;
