import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { store } from "../store/store";
import { Provider } from "react-redux";
import LoadingState from "../context/toploadingbar/LoadingState";
import userEvent from "@testing-library/user-event";

test("renders Basic Element in Navbar", () => {
  render(
    <Provider store={store}>
      <LoadingState>
        <Navbar />
      </LoadingState>
    </Provider>
  );
  const SignInElement = screen.getByText(/SignIn/i);
  expect(SignInElement).toBeInTheDocument();
  const PriElement = screen.getByText(/Pri/i);
  expect(PriElement).toBeInTheDocument();
  const lixElement = screen.getByText(/lix/i);
  expect(lixElement).toBeInTheDocument();
});
test("renders When Login Modal Is true in Navbar", () => {
  function setRModal(value) {
    let rmodal = value;
  }
  function setLModal(value) {
    let lmodal = value;
  }
  render(
    <Provider store={store}>
      <LoadingState>
        <Navbar lmodal={true} setRModal={setRModal} setLModal={setLModal} />
      </LoadingState>
    </Provider>
  );

  const LoginElement = screen.getByText(/LOGIN/i);
  expect(LoginElement).toBeInTheDocument();
  const SIGNINElement = screen.getByText(/SIGN IN/i);
  expect(SIGNINElement).toBeInTheDocument();
  const SIGNUPElement = screen.getByText(/SIGN UP/i);
  expect(SIGNUPElement).toBeInTheDocument();
  const SwitchElement = screen.getByText(/Switch it on if you are admin/i);
  expect(SwitchElement).toBeInTheDocument();
  const EmailElement = screen.getByPlaceholderText(/Email/i);
  expect(EmailElement).toBeInTheDocument();
  const PasswordElement = screen.getByPlaceholderText(/Password/i);
  expect(PasswordElement).toBeInTheDocument();
  const SignupBtn = screen.getByRole("button", { name: "SIGN UP" });
  userEvent.click(SignupBtn);
  expect(SignupBtn).toBeVisible();
});
