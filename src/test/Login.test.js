import { render, screen } from "@testing-library/react";
import Login from "../components/Navbar/Login";
import { store } from "../store/store";
import { Provider } from "react-redux";
import LoadingState from "../context/toploadingbar/LoadingState";
import userEvent from "@testing-library/user-event";
test("renders When Login Modal Is true and email is typed", async () => {
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
  const emailElement = screen.getByDisplayValue(/s@s.com/i);
  expect(emailElement).toBeInTheDocument();
  const passwordElement = screen.getByDisplayValue(/sudhansu/i);
  expect(passwordElement).toBeInTheDocument();
});
