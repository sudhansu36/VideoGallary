import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import LoadingContext from "../../context/toploadingbar/LoadingContext";
import { userLogin, clearLoginState } from "../../store/userSlice";
const Login = (props) => {
  const { setProgress } = useContext(LoadingContext);
  let history = useHistory();
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
  // Geting value from Store
  let { userObj, isSuccess, invalidLoginMessage } = useSelector(
    (state) => state.user
  );
  // This is for Navigating to Dashboard after successful Login
  useEffect(() => {
    // for Userdashboard
    if (isSuccess === true && userCredentialObj.type === false) {
      props.setLModal(false);
      history.push(`/userdashboard/${userObj.name}`);
    }
    // for AdminDashboard
    if (isSuccess === true && userCredentialObj.type === true) {
      props.setLModal(false);
      history.push(`/admindashboard/${userObj.name}`);
    }
    // eslint-disable-next-line
  }, [isSuccess, userCredentialObj]);
  // When you clicked on Sign In
  function onLoginFormSubmit(userObj) {
    setProgress(30);
    setUserCredentialObj({ ...userObj });
    setProgress(60);
    dispatch(userLogin({ ...userObj }));
    setProgress(100);
  }
  return (
    <Modal show={props.lmodal} centered onHide={() => props.setLModal(false)}>
      <Modal.Header className="d-flex justify-content-between">
        <h5>
          LOGIN{" "}
          <span className="text-danger text-center">
            *{invalidLoginMessage}
          </span>
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => props.setLModal(false)}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onLoginFormSubmit)}>
          {/* User Type */}
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
          {/* Email */}
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
          {/* Password */}
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
          {/* Sign in Button */}
          <button className="btn btn-success mx-auto mb-3 d-block">
            SIGN IN{" "}
            <img
              src="https://img.icons8.com/material-sharp/24/ffffff/login-rounded.png"
              alt=""
            />
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <p className="text-dark">New User..</p>
        {/* Siup in Button */}
        <button
          type="button"
          className="btn btn-warning btn-sm text-light"
          onClick={() => {
            props.setRModal(true);
            props.setLModal(false);
          }}
        >
          SIGN UP
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;
