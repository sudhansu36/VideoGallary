import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { store } from "../store/store";
import { Provider } from "react-redux";
import LoadingState from "../context/toploadingbar/LoadingState";
test("renders SignIn in Navbar", () => {
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
