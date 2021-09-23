import { render, screen, waitFor } from "@testing-library/react";
import Login from "../components/Navbar/Login";
import { store } from "../store/store";
import { Provider } from "react-redux";
import LoadingState from "../context/toploadingbar/LoadingState";
import userEvent from "@testing-library/user-event";
test("renders When Login Modal Is true in and email is typed", async () => {
  function setProgress(value) {}
  render(
    <Provider store={store}>
      <LoadingState>
        <Login lmodal={true} setProgress={setProgress} />
      </LoadingState>
    </Provider>
  );
  userEvent.type(screen.getByPlaceholderText(/Password/i), "sudhansu");
  userEvent.type(screen.getByPlaceholderText(/Email/i), "s@s.com");
  const SignInBtn = screen.getByRole("button", { name: "SIGN IN" });
  userEvent.click(SignInBtn);
  expect(SignInBtn).toBeVisible();
});
