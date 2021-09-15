import { render, screen } from "@testing-library/react";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import LoadingState from "./context/toploadingbar/LoadingState";
test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <LoadingState>
        <App />
      </LoadingState>
    </Provider>
  );
  const linkElement = screen.getByText(/About/i);
  expect(linkElement).toBeInTheDocument();
});
